const Ajv = require("ajv");
const ajv = new Ajv();
const ingredientDao = require("../../dao/ingredient-dao.js");

const schema = {
  type: "object",
  properties: {
    name: { type: "string" },
  },
  required: ["name"],
  additionalProperties: false,
};

async function GetIngredientAbl(req, res) {
  try {
    const reqParams = req.query?.name ? req.query : req.body;

    const valid = ajv.validate(schema, reqParams);
    if (!valid) {
      return res.status(400).json({
        code: "dtoInIsNotValid",
        message: "The input data format is not valid.",
        validationError: ajv.errors,
      });
    }

    const ingredient = await ingredientDao.getByName(reqParams.name);
    if (!ingredient) {
      return res.status(404).json({
        code: "ingredientNotFound",
        message: `Ingredient with the name ${reqParams.name} not found.`,
      });
    }

    res.json(ingredient);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = GetIngredientAbl;
