const path = require('path');
const fs = require('fs');

const recipeFolderPath = path.join(global.projectRoot, 'dao', 'storage', 'recipeList');

if (!fs.existsSync(recipeFolderPath)) {
  fs.mkdirSync(recipeFolderPath, { recursive: true });
  console.log('Directory created:', recipeFolderPath);
} else {
  console.log('Directory already exists:', recipeFolderPath);
}

const recipeDao = require('../../dao/recipe-dao');

async function searchByIngredientsAbl(req, res) {
  try {
      const ingredientIds = req.body.ingredientIds;

      if (!Array.isArray(ingredientIds) || ingredientIds.length === 0) {
          return res.status(400).json({
              code: "noIngredientsProvided",
              message: "No ingredients provided for the search.",
          });
      }

      // Read all recipe files
      const recipeFiles = fs.readdirSync(recipeFolderPath);

      // Filter recipes that contain any of the provided ingredient IDs
      const matchedRecipes = recipeFiles.reduce((matches, file) => {
          const recipeData = fs.readFileSync(path.join(recipeFolderPath, file), 'utf8');
          const recipe = JSON.parse(recipeData);
          
          const containsIngredient = recipe.ingredients.some(ingredient =>
              ingredientIds.includes(ingredient.id)
          );

          if (containsIngredient) {
              matches.push(recipe);
          }

          return matches;
      }, []);

      if (matchedRecipes.length === 0) {
          res.status(404).json({
              code: "noRecipesFound",
              message: "No recipes found with the provided ingredients.",
          });
      } else {
          res.json(matchedRecipes);
      }
  } catch (e) {
      res.status(500).json({ message: e.message });
  }
}

module.exports = searchByIngredientsAbl;
