const client = require("./client");

async function createCart({ userId, isPurchased=false }) {
    try {
      const {
        rows: [cart],
      } = await client.query(
        `INSERT INTO cart("userId", "isPurchased")
         VALUES ($1, $2) 
         RETURNING *`,
        [userId, isPurchased]
      );
  
      return cart;
    } catch (error) {
      console.error("Failed to create cart!");
      throw error;
    }
  }

  module.exports = {
    createCart
}