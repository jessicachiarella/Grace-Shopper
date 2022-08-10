const client = require("./client");

async function createCategories({ name }) {
    try {
      const {
        rows: [categories],
      } = await client.query(
        `INSERT INTO categories(name)
         VALUES ($1) 
         RETURNING *`,
        [name]
      );
  
      return categories;
    } catch (error) {
      console.error("Failed to create categories!");
      throw error;
    }
  }

  module.exports = {
    createCategories
}