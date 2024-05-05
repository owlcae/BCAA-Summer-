const express = require("express");
const router = express.Router();

const GetIngredientAbl = require("../abl/ingredient/getAbl");
const ListIngredientsAbl = require("../abl/ingredient/listAbl");
const { CreateOrUpdateIngredientAbl } = require("../abl/ingredient/createOrUpdateAbl");
const DeleteIngredientAbl = require("../abl/ingredient/deleteAbl");

router.get("/get", (req, res) => {
  GetIngredientAbl(req, res);
});

router.get("/list", (req, res) => {
  ListIngredientsAbl(req, res);
});

router.post("/create", (req, res) => {
  CreateOrUpdateIngredientAbl(req, res);
});

router.post("/update", (req, res) => {
  CreateOrUpdateIngredientAbl(req, res);
});

router.post("/delete", (req, res) => {
  DeleteIngredientAbl(req, res);
});

module.exports = router;
