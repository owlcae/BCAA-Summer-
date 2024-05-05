const ingredientDao = require("../../dao/ingredient-dao.js");

async function ListIngredientAbl(req, res) {
  try {
    const ingredientList = await ingredientDao.list();
    res.json(ingredientList);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = ListIngredientAbl;
