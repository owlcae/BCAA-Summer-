const Ajv = require("ajv");
const ajv = new Ajv({ allErrors: true });
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const recipeDao = require("../../dao/recipe-dao.js");
const { assignIngredientIds } = require("../../dao/ingredient-dao.js");

const recipeFolderPath = path.join(global.projectRoot, 'dao', 'storage', 'recipeList');

const schema = {
  type: "object",
  properties: {
    title: { type: "string" },
    ingredients: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { type: "string" },
          quantity: { type: "number" },
          unit: { type: "string" }
        },
        required: ["name", "quantity", "unit"]
      }
    },
    instructions: { type: "string" },
    totalTime: { type: "string" },
  },
  required: ["title", "ingredients", "instructions", "totalTime"],
  additionalProperties: false
};

async function CreateRecipeAbl(req, res) {
  try {
    const recipe = req.body;

    if (!ajv.validate(schema, recipe)) {
      return res.status(400).json({
        code: "ValidationFailure",
        message: "Validation failed",
        details: ajv.errors
      });
    }

    recipe.ingredients = await assignIngredientIds(recipe.ingredients);

    const createdRecipe = await recipeDao.create(recipe);

    res.status(201).json(createdRecipe);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = {
  CreateRecipeAbl,
  assignIngredientIds  // Assuming this needs to be exported for use elsewhere
};
