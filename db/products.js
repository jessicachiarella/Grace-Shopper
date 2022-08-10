const client = require("./client");

async function createProduct({ name, description, price, categoryId, image_url, inStock=true }) {
    try {
      const {
        rows: [product],
      } = await client.query(
        `INSERT INTO products(name, description, price, "categoryId", image_url, "inStock")
         VALUES ($1, $2, $3, $4, $5, $6) 
         RETURNING *`,
        [name, description, price, categoryId, image_url, inStock]
      );
  
      return product;
    } catch (error) {
      console.error("Failed to create product!");
      throw error;
    }
  }

  module.exports = {
    createProduct
}