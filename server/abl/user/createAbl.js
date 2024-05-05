const Ajv = require("ajv");
const ajv = new Ajv({ allErrors: true });

ajv.addFormat("email", {
  type: "string",
  validate: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
});

const schema = {
  type: "object",
  properties: {
    name: { type: "string", minLength: 1 },
    email: { type: "string", format: "email" }, 
  },
  required: ["name", "email"], 
  additionalProperties: false, 
};

const userDao = require("../../dao/user-dao.js");

async function CreateAbl(req, res) {
  try {
    const userData = req.body;

    // Validate input
    const valid = ajv.validate(schema, userData);
    if (!valid) {
      return res.status(400).json({
        code: "dtoInIsNotValid",
        message: "Given user data is not valid",
        errors: ajv.errors,
      });
    }

    // Check if the email already exists
    const userList = userDao.list();
    const emailExists = userList.some((user) => user.email === userData.email);
    if (emailExists) {
      return res.status(400).json({
        code: "emailAlreadyExists",
        message: `A user with email ${userData.email} already exists.`,
      });
    }

    // Create the user
    const user = userDao.create(userData);
    res.status(201).json(user); 
  } catch (error) {
    res.status(500).json({
      code: "createUserFailed",
      message: "Failed to create user",
      error: error.message,
    });
  }
}

module.exports = CreateAbl;
