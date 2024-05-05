const Ajv = require("ajv");
const ajv = new Ajv();
const recipeDao = require("../../dao/recipe-dao.js");

async function GetRecipeAblByTitle(req, res) {
    try {
      const reqParams = req.query?.title ? req.query : req.body;
  
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
  
      const recipes = await recipeDao.list();
  
      // Find the recipe by title
      const recipe = recipes.find(r => r.title.toLowerCase() === reqParams.title.toLowerCase());
  
      if (recipe) {
        res.json(recipe);
      } else {
        res.status(404).json({ message: "Recipe not found" });
      }
  
      //recipe.ingredients = await ingredientDao.listByRecipeId(reqParams.id);
  
      //res.json(recipe);
      return res;
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
  
  module.exports = GetRecipeAblByTitle;