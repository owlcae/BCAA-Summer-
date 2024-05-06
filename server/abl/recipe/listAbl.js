const recipeDao = require("../../dao/recipe-dao.js");
const ingredientDao = require("../../dao/ingredient-dao.js");
const fs = require('fs');
const path = require('path');

const recipeFolderPath = path.join(global.projectRoot, 'dao', 'storage', 'recipeList');

// async function ListRecipesAbl(req, res) {
//   try {
//     const recipeList = await recipeDao.list(); 
//     for (let recipe of recipeList) {
      
//       recipe.ingredients = await ingredientDao.listIngredientsForRecipe(recipe.id);
//     }

//     res.json(recipeList);
//   } catch (e) {
//     res.status(500).json({ message: e.message });
//   }
// }

async function ListRecipesAbl(req, res) {
  try {
    const recipeList = recipeDao.listAllRecipes(); 
    return res.json(recipeList); // Send the list of recipes as the response
    // res.json(recipeList); // Directly return the list without ingredient details
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

// async function ListRecipesAbl() {
//   try {
//     const files = fs.readdirSync(recipeFolderPath);
//     return files.map(file => {
//       const filePath = path.join(recipeFolderPath, file);
//       const fileData = fs.readFileSync(filePath, 'utf8');
//       return JSON.parse(fileData);
//     });
//   } catch (error) {
//     console.error('Failed to list recipes:', error.message);
//     return []; // Return an empty array in case of error
//   }
// }

module.exports = ListRecipesAbl;
