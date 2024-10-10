// utils/fileUtils.js
const fs = require("fs-extra");
const path = require("path");

const filePath = path.join(__dirname, "../data/snippets.json");

// Read data from the JSON file
async function readData() {
  try {
    const data = await fs.readJson(filePath);
    return data;
  } catch (error) {
    // If the file doesn't exist, return an empty array
    return [];
  }
}

// Write data to the JSON file
async function writeData(data) {
  try {
    await fs.writeJson(filePath, data, { spaces: 2 });
  } catch (error) {
    throw new Error("Error writing to the file");
  }
}

module.exports = { readData, writeData };
