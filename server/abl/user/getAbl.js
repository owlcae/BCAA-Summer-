const Ajv = require("ajv");
const ajv = new Ajv({
  allErrors: true
});

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
    name: { type: "string" },
    email: { type: "string", format: "email" }
  },
  required: ["name", "email"],
  additionalProperties: false
};

async function GetAbl(req, res) {
  try {
    const reqParams = req.query?.id ? req.query : req.body;

    // Validate input
    const valid = ajv.validate(schema, reqParams);
    if (!valid) {
      return res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
    }

    // Read user by given id
    const user = userDao.get(reqParams.id);
    if (!user) {
      return res.status(404).json({
        code: "userNotFound",
        message: `User ${reqParams.id} not found`,
      });
    }

    return res.json(user);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}

module.exports = GetAbl;
