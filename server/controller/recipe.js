const express = require("express");
const router = express.Router();

const GetRecipeAbl = require("../abl/recipe/getAbl");
const GetRecipeAblByTitle = require("../abl/recipe/getAblByTitle");
const ListRecipesAbl = require("../abl/recipe/listAbl");
const { CreateRecipeAbl } = require("../abl/recipe/createAbl");
const UpdateRecipeAbl = require("../abl/recipe/updateAbl");
const DeleteRecipeAbl = require("../abl/recipe/deleteAbl");
const SearchByIngredientsAbl = require('../abl/recipe/searchByIngredientsAbl');

router.use(express.json());

router.post('/search', async (req, res) => {
  try {
    const { ingredientIds } = req.body;
    console.log('Received ingredientIds:', ingredientIds); // Log the incoming data

    // Validate ingredientIds
    if (!ingredientIds || !Array.isArray(ingredientIds) || ingredientIds.length === 0) {
      return res.status(400).json({ message: 'ingredientIds is required and should be a non-empty array' });
    }
    const recipes = await SearchByIngredientsAbl(ingredientIds);
    res.status(200).json(recipes);
  } catch (error) {
    console.error('Error searching recipes:', error); // Improved error logging
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});


router.get("/get/:id", async (req, res) => {
  await GetRecipeAbl(req, res);
});

// router.post('/search', async (req, res) => {
//   const { ingredientIds } = req.body;
//   try {
//     if (!ingredientIds) {
//       return res.status(400).json({ message: 'ingredientIds is required' });
//     }
//
//     const recipes = await SearchByIngredientsAbl(ingredientIds);
//     res.status(200).json(recipes);
//   } catch (error) {
//     console.error('Error searching recipes:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

router.get("/list", async (req, res) => {
  await ListRecipesAbl(req, res);
});

router.post("/create", async (req, res) => {
  await CreateRecipeAbl(req, res);
});

router.post("/update", async (req, res) => {
  await UpdateRecipeAbl(req, res);
});

router.delete("/delete/:id", async (req, res) => {
  await DeleteRecipeAbl(req, res);
});

router.post("/search", async (req, res) => {
  await SearchByIngredientsAbl(req, res);
});

router.get("/:recipeTitle", async (req, res) => {
  await GetRecipeAblByTitle(req, res);
});

module.exports = router;
