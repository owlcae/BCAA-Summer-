const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;

global.projectRoot = __dirname;

const recipeController = require("././controller/recipe");
const ingredientController = require("././controller/ingredient");
const userController = require("././controller/user");
const searchByIngredientsAbl = require('./abl/recipe/searchByIngredientsAbl');

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to PantryChef!");
});

app.post('/search', searchByIngredientsAbl);

app.use("/recipes", recipeController);
app.use("/ingredients", ingredientController);
app.use("/users", userController);

app.listen(port, () => {
  console.log(`PantryChef app listening on port ${port}`);
});
