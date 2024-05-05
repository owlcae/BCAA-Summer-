const recipeDao = require("../../dao/recipe-dao.js");
const ingredientDao = require("../../dao/ingredient-dao.js");

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
    const recipeList = await recipeDao.list(); 
    res.json(recipeList); // Send the list of recipes as the response
    //res.json(recipeList); // Directly return the list without ingredient details
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = ListRecipesAbl;
