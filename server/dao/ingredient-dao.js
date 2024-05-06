const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const ingredientFolderPath = path.join(global.projectRoot, 'dao', 'storage', 'ingredientList');

function readIngredientFile(filePath) {
  if (fs.existsSync(filePath)) {
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  }
  return null;
}

function get(ingredientId) {
  const filePath = path.join(ingredientFolderPath, `${ingredientId}.json`);
  return readIngredientFile(filePath);
}

function list() {
  return fs.readdirSync(ingredientFolderPath)
    .map(file => readIngredientFile(path.join(ingredientFolderPath, file)))
    .filter(Boolean);
}

function createOrUpdate(ingredientData) {
  let ingredient = ingredientData.id ? get(ingredientData.id) : list().find(i => i.name.toLowerCase() === ingredientData.name.toLowerCase());

  if (ingredient) {
    // Update existing ingredient
    const updatedIngredient = { ...ingredient, ...ingredientData };
    const filePath = path.join(ingredientFolderPath, `${ingredient.id}.json`);
    fs.writeFileSync(filePath, JSON.stringify(updatedIngredient, null, 2), "utf8");
    return updatedIngredient;
  } else {
    // Create new ingredient as no existing one matches
    ingredientData.id = uuidv4();
    const filePath = path.join(ingredientFolderPath, `${ingredientData.id}.json`);
    fs.writeFileSync(filePath, JSON.stringify(ingredientData, null, 2), "utf8");
    return ingredientData;
  }
}

function remove(ingredientId) {
  const filePath = path.join(ingredientFolderPath, `${ingredientId}.json`);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    return { message: 'Ingredient successfully deleted.' };
  } else {
    throw new Error('Ingredient not found.');
  }
}

module.exports = {
  get,
  createOrUpdate,
  remove,
  list
};
