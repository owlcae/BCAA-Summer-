const Ajv = require("ajv");
const ajv = new Ajv({ allErrors: true });
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const ingredientDao = require("../../dao/ingredient-dao.js");

const ingredientFolderPath = path.join(global.projectRoot, 'dao', 'storage', 'ingredientList');

// const projectFolderPath = path.join(__dirname, '..', '..', 'Project');
// const ingredientFolderPath = path.join(projectFolderPath, 'dao', 'storage', 'ingredientList');

function saveIngredient(ingredient) {
  const filePath = path.join(ingredientFolderPath, `${ingredient.id}.json`);
  fs.writeFileSync(filePath, JSON.stringify(ingredient, null, 2));
}

function listIngredients() {
  return fs.readdirSync(ingredientFolderPath).map(file => {
    return JSON.parse(fs.readFileSync(path.join(ingredientFolderPath, file), 'utf8'));
  });
}

const schema = {
  type: "object",
  properties: {
    name: { type: "string" },
    unit: { type: "string" },
    group: {
      type: "string",
      // enum: [
      //   "Spices and Herbs",
      //   "Dairy Products",
      //   "Vegetables",
      //   "Sweeteners",
      //   "Oils and Fats",
      //   "Proteins",
      //   "Grains",
      //   "Fruits"
      // ]
    }
  },
  required: ["name", "unit", "group"], // Ensure 'group' is required if it should be
  additionalProperties: false
};

async function CreateOrUpdateIngredientAbl(req, res) {
  try {
    const ingredient = req.body;

    // Validate input against the schema
    if (!ajv.validate(schema, ingredient)) {
      return res.status(400).json({
        code: "dtoInIsNotValid",
        message: "The input data format is not valid.",
        validationError: ajv.errors,
      });
    }

    // Determine if this is a creation or update scenario
    const ingredients = listIngredients();
    const existingIngredient = ingredients.find(i => i.name.toLowerCase() === ingredient.name.toLowerCase());

    if (existingIngredient) {
      ingredient.id = existingIngredient.id; // Use existing ID
      saveIngredient(ingredient); // Update existing ingredient
    } else {
      ingredient.id = uuidv4(); // Assign new ID
      saveIngredient(ingredient); // Save new ingredient
    }

    res.status(201).json({ message: "Ingredient saved successfully", ingredient });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = { CreateOrUpdateIngredientAbl };
