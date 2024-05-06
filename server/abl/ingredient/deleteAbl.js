const Ajv = require("ajv");
const ajv = new Ajv();
const ingredientDao = require("../../dao/ingredient-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string" }
  },
  required: ["id"],
  additionalProperties: false,
};

async function DeleteIngredientAbl(req, res) {
  try {
    const reqParams = req.body;

    // Validate input
    const valid = ajv.validate(schema, reqParams);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors
      });
      return;
    }

    // Attempt to remove the ingredient by ID
    const result = await ingredientDao.remove(reqParams.id);
    if (!result) {
      res.status(404).json({
        code: "ingredientNotFound",
        message: `Ingredient with ID ${reqParams.id} not found`,
      });
      return;
    }

    res.status(204).send(); // No content to send back
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = DeleteIngredientAbl;
