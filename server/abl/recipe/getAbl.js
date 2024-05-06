const Ajv = require("ajv");
const ajv = new Ajv();
const recipeDao = require("../../dao/recipe-dao.js");
const ingredientDao = require("../../dao/ingredient-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
    title: {type: "string"}
  },
  additionalProperties: false,
};

async function GetRecipeAbl(req, res) {
  try {
    const reqParams = req.query?.id ? req.query : req.body;

    // Validate input
    const valid = ajv.validate(schema, reqParams);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "The input data is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    // Read recipe by given id
    const recipe = await recipeDao.get(reqParams.id);
    if (!recipe) {
      res.status(404).json({
        code: "recipeNotFound",
        message: `Recipe ${reqParams.id} not found`,
      });
      return;
    }

    recipe.ingredients = await ingredientDao.listByRecipeId(reqParams.id);

    res.json(recipe);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = GetRecipeAbl;
