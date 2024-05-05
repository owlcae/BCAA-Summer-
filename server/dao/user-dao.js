const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const userFolderPath = path.join(global.projectRoot, 'dao', 'storage', 'userList');

function get(userId) {
  try {
    const filePath = path.join(userFolderPath, `${userId}.json`);
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, "utf8");
      return JSON.parse(fileData);
    }
    return null;
  } catch (error) {
    throw { code: "failedToReadUser", message: error.message };
  }
}

function create(user) {
  try {
    user.id = crypto.randomBytes(16).toString("hex");
    const filePath = path.join(userFolderPath, `${user.id}.json`);
    const fileData = JSON.stringify(user, null, 2); // Pretty print JSON
    fs.writeFileSync(filePath, fileData, "utf8");
    return user;
  } catch (error) {
    throw { code: "failedToCreateUser", message: error.message };
  }
}

function update(user) {
  try {
    const filePath = path.join(userFolderPath, `${user.id}.json`);
    if (!fs.existsSync(filePath)) {
      return null;
    }
    const currentUser = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const newUser = { ...currentUser, ...user };
    fs.writeFileSync(filePath, JSON.stringify(newUser, null, 2), "utf8"); // Pretty print JSON
    return newUser;
  } catch (error) {
    throw { code: "failedToUpdateUser", message: error.message };
  }
}

function remove(userId) {
  try {
    const filePath = path.join(userFolderPath, `${userId}.json`);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    return {};
  } catch (error) {
    throw { code: "failedToRemoveUser", message: error.message };
  }
}

function list() {
  try {
    const files = fs.readdirSync(userFolderPath);
    return files.map(file => JSON.parse(fs.readFileSync(path.join(userFolderPath, file), "utf8")));
  } catch (error) {
    throw { code: "failedToListUsers", message: error.message };
  }
}

module.exports = {
  get,
  create,
  update,
  remove,
  list,
};
