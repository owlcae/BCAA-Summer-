const Ajv = require("ajv");
const ajv = new Ajv();
const recipeDao = require("../../dao/recipe-dao.js");

async function GetRecipeAblByTitle(req, res) {
  //   try {
  //     const reqParams = req.query?.title ? req.query : req.body;
  
  //     // Validate input
  //     const valid = ajv.validate(schema, reqParams);
  //     if (!valid) {
  //       res.status(400).json({
  //         code: "dtoInIsNotValid",
  //         message: "The input data is not valid",
  //         validationError: ajv.errors,
  //       });
  //       return;
  //     }
  
  //     const recipes = await recipeDao.list();
  
  //     // Find the recipe by title
  //     const recipe = recipes.find(r => r.title.toLowerCase() === reqParams.title.toLowerCase());
  
  //     if (recipe) {
  //       res.json(recipe);
  //     } else {
  //       res.status(404).json({ message: "Recipe not found" });
  //     }
  
  //     //recipe.ingredients = await ingredientDao.listByRecipeId(reqParams.id);
  
  //     //res.json(recipe);
  //     return res;
  //   } catch (e) {
  //     res.status(500).json({ message: e.message });
  //   }
  // }

  try {
    const title = req.params.recipeTitle.replace(/-/g, " ").replace("%20", "-");
    const recipe = await recipeDao.findByTitle(title);
    if (recipe) {
        res.json(recipe);
    } else {
        res.status(404).send("Recipe not found");
    }
} catch (error) {
    res.status(500).send(error.message);
  }
};
  
module.exports = GetRecipeAblByTitle;