const express = require("express");
const router = express.Router();

const GetRecipeAbl = require("../abl/recipe/getAbl");
const GetRecipeAblByTitle = require("../abl/recipe/getAblByTitle");
const ListRecipesAbl = require("../abl/recipe/listAbl");
const { CreateRecipeAbl } = require("../abl/recipe/createAbl");
const UpdateRecipeAbl = require("../abl/recipe/updateAbl");
const DeleteRecipeAbl = require("../abl/recipe/deleteAbl");
const SearchByIngredientsAbl = require('../abl/recipe/searchByIngredientsAbl');

router.get("/get/:id", async (req, res) => {
  await GetRecipeAbl(req, res);
});

router.get("/search/:ingredientId", async (req, res) => {
  try {
    const ingredientId = req.params.ingredientId;
    const results = await SearchByIngredientsAbl(ingredientId);
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

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
