const Ajv = require("ajv");
const ajv = new Ajv();
const recipeDao = require("../../dao/recipe-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string" }, 
  },
  required: ["id"],
  additionalProperties: false,
};

async function DeleteRecipeAbl(req, res) {
  try {
    const reqParams = req.body;

    // Validate input
    const valid = ajv.validate(schema, reqParams);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "The input data is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    // Attempt to delete the recipe directly
    const deleteResult = await recipeDao.remove(reqParams.id);
    if (deleteResult) {
      res.json({ message: `Recipe ${reqParams.id} has been successfully deleted.` });
    } else {
      res.status(404).json({ message: `Recipe ${reqParams.id} not found.` });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = DeleteRecipeAbl;
