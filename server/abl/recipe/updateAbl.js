const Ajv = require("ajv");
const ajv = new Ajv();
const recipeDao = require("../../dao/recipe-dao.js");
const { assignIngredientIds } = require("../../dao/ingredient-dao.js"); 

const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
    title: { type: "string", minLength: 1 }, 
    ingredients: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          group: { type: "string" },
          unit: { type: "string" }
        },
        required: ["id", "group", "unit"],
        additionalProperties: false
      }
    },
    instructions: { type: "string", minLength: 1 }, 
    totalTime: { type: "number", minimum: 1 } 
  },
  required: ["id"], 
  additionalProperties: false
};

async function UpdateRecipeAbl(req, res) {
  try {
    let recipe = req.body;

    // Validate input
    const valid = ajv.validate(schema, recipe);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors
      });
      return;
    }

    // Update the recipe via the DAO
    const updatedRecipe = await recipeDao.update(recipe);
    if (!updatedRecipe) {
      res.status(404).json({
        code: "recipeNotFound",
        message: `Recipe ${recipe.id} not found`
      });
      return;
    }

    res.json(updatedRecipe);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = UpdateRecipeAbl; assignIngredientIds
