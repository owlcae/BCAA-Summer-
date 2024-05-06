const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { log } = require("console");

const recipeFolderPath = path.join(global.projectRoot, 'dao', 'storage', 'recipeList');

function get(recipeId) {
  try {
    const filePath = path.join(recipeFolderPath, `${recipeId}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw new Error(`Failed to read recipe: ${error.message}`);
  }
}

function create(recipe) {
  try {
    if (!recipe.id) {
      recipe.id = crypto.randomBytes(16).toString("hex");
    }
    
    const filePath = path.join(recipeFolderPath, `${recipe.id}.json`);
    
    const recipeJson = JSON.stringify(recipe, null, 2);
    
    fs.writeFileSync(filePath, recipeJson, "utf8");
    
    return recipe;
  } catch (error) {
    throw new Error(`Failed to create recipe: ${error.message}`);
  }
}

const findByTitle = (title) => {
  // Предположим, что у вас есть функция для чтения всех рецептов и поиска нужного
  const recipes = listAllRecipes(); // Эта функция возвращает все рецепты
  return recipes.find(recipe => recipe.title.toLowerCase() === title.toLowerCase());
};

function update(recipe) {
  try {
    if (!get(recipe.id)) return null;
    const filePath = path.join(recipeFolderPath, `${recipe.id}.json`);
    fs.writeFileSync(filePath, JSON.stringify(recipe), "utf8");
    return recipe;
  } catch (error) {
    throw new Error(`Failed to update recipe: ${error.message}`);
  }
}

function remove(recipeId) {
  try {
    const filePath = path.join(recipeFolderPath, `${recipeId}.json`);
    fs.unlinkSync(filePath);
    return {};
  } catch (error) {
    if (error.code === "ENOENT") return {};
    throw new Error(`Failed to remove recipe: ${error.message}`);
  }
}

// function list() {
//   try {
//     console.log("Started listing recipes");

//     // Чтение всех файлов в директории
//     const files = fs.readdirSync(recipeFolderPath);
//     console.log(`Files found: ${files.length}`);

//     const recipes = files.map(file => {
//       const filePath = path.join(recipeFolderPath, file);
//       try {
//         console.log(`Processing file: ${file}`);
        
//         // Чтение и парсинг файла JSON
//         const fileData = fs.readFileSync(filePath, "utf8");
//         const recipe = JSON.parse(fileData);
//         console.log(`Successfully parsed: ${JSON.stringify(recipe)}`);

//         return recipe;
//       } catch (err) {
//         console.error(`Error reading or parsing file ${file}:`, err.message);
//         return null;
//       }
//     }).filter(recipe => recipe !== null); // Filter out any null values due to errors

//     console.log(`Total successful recipes parsed: ${recipes.length}`);
//     return recipes;
//   } catch (error) {
//     console.error('Failed to read the directory:', error.message);
//     return []; // Возвращаем пустой массив в случае ошибки
//   }
// }

function listAllRecipes() {
  try {
    const files = fs.readdirSync(recipeFolderPath);
    return files.map(file => {
      const filePath = path.join(recipeFolderPath, file);
      const recipeData = fs.readFileSync(filePath, "utf8");
      return JSON.parse(recipeData);
    });
  } catch (error) {
    console.error('Failed to list all recipes:', error);
    return [];
  }
}

function searchByIngredients(ingredientList) {
  try {
      const files = fs.readdirSync(recipesFolderPath);
      const matchedRecipes = [];

      files.forEach(file => {
          const filePath = path.join(recipesFolderPath, file);
          const data = fs.readFileSync(filePath, 'utf8');
          const recipe = JSON.parse(data);

          const containsIngredient = recipe.ingredients.some(ing =>
              ingredientList.includes(ing.name)
          );

          if (containsIngredient) {
              matchedRecipes.push(recipe);
          }
      });

      return matchedRecipes;
  } catch (error) {
      throw new Error(`Failed to search recipes: ${error.message}`);
  }
}


module.exports = {
  get,
  create,
  update,
  remove,
  listAllRecipes,
  searchByIngredients,
  findByTitle
};
