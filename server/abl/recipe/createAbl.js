const path = require('path');
const fs = require('fs');
const Ajv = require("ajv");
const ajv = new Ajv({ allErrors: true });
const { v4: uuidv4 } = require('uuid');
const recipeDao = require("../../dao/recipe-dao.js");
const { assignIngredientIds } = require("../../dao/ingredient-dao.js");

const recipeFolderPath = path.join(global.projectRoot, 'dao', 'storage', 'recipeList');

// const projectFolderPath = path.join(__dirname, '..', '..', 'Project');
// const recipeFolderPath = path.join(projectFolderPath, 'dao', 'storage', 'recipeList');


const schema = {
  type: "object",
  properties: {
    title: { type: "string" },
    image: { type: "string"},
    ingredients: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { type: "string" },
          group: { type: "string" },
          unit: { type: "string" }
        },
        required: ["name", "group", "unit"]
      }
    },
    instructions: { type: "string" },
    totalTime: { type: "string" },
  },
  required: ["title", "image", "ingredients", "instructions", "totalTime"],
  additionalProperties: false
};

async function CreateRecipeAbl(req, res) {
  try {
    const recipe = req.body;

    // Валидация
    if (!ajv.validate(schema, recipe)) {
      return res.status(400).json({
        code: "ValidationFailure",
        message: "Validation failed",
        details: ajv.errors
      });
    }

    // Присвоение ID ингредиентам
    recipe.ingredients = await assignIngredientIds(recipe.ingredients);

    // Генерация уникального ID для рецепта, если он отсутствует
    if (!recipe.id) {
      recipe.id = uuidv4(); // Assuming you have uuidv4 function to generate UUIDs
    }

    // Создание рецепта
    const createdRecipe = await recipeDao.create(recipe);

    // Сохранение файла под уникальным именем на основе ID
    const filePath = path.join(recipeFolderPath, `${createdRecipe.id}.json`);
    fs.writeFileSync(filePath, JSON.stringify(createdRecipe, null, 2));

    // Ответ сервера
    res.status(201).json(createdRecipe);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = {
  CreateRecipeAbl,
  assignIngredientIds
};
