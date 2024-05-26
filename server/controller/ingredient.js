const express = require("express");
const router = express.Router();

const GetIngredientAbl = require("../abl/ingredient/getAbl");
const ListIngredientsAbl = require("../abl/ingredient/listAbl");
const { CreateOrUpdateIngredientAbl } = require("../abl/ingredient/createOrUpdateAbl");
const DeleteIngredientAbl = require("../abl/ingredient/deleteAbl");

router.get("/get", (req, res) => {
  GetIngredientAbl(req, res).then(r => {

  });
});

router.get("/list", (req, res) => {
  ListIngredientsAbl(req, res).then(r => {

  });
});

router.post("/create", (req, res) => {
  CreateOrUpdateIngredientAbl(req, res).then(r => {

  });
});

router.post("/update", (req, res) => {
  CreateOrUpdateIngredientAbl(req, res).then(r => {

  });
});

router.post("/delete", (req, res) => {
  DeleteIngredientAbl(req, res).then(r => {

  });
});

module.exports = router;
