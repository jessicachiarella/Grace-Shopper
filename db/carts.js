const {client} = require("./client");
const {mapProducts} = require("./helpers")

async function createCart({ userId, isPurchased = false }) {
  try {
    const {
      rows: [carts],
    } = await client.query(
      `INSERT INTO carts("userId", "isPurchased")
         VALUES ($1, $2) 
         RETURNING *`,
      [userId, isPurchased]
    );

    return carts;
  } catch (error) {
    console.error("Failed to create cart!");
    throw error;
  }
}

async function getCartById(id) {
  try {
    const {
      rows: [carts],
    } = await client.query(
      `
      SELECT * 
      FROM carts
      LEFT JOIN "orderItems" ON "orderItems"."cartId" = carts.id
      LEFT JOIN products ON "orderItems"."productId" = products.id
      WHERE carts."userId" = $1;
      `,
      [id]
    );
return carts
    // return await mapProducts(carts);
  } catch (error) {
    throw error;
  }
}
//Need to write helper function that maps through these

// async function getAllCartsByUser({ userId }) {
//   try {
//     const {rows:carts} = await client.query(`
//      SELECT *
//      FROM carts
//      JOIN users.id ON carts."userId"=users.id
//      WHERE "userId" = $1
//     `, [userId])
//     return carts
//   } catch(error){
//     throw error
//   }
// }

// async function getAllPurchasedCartsByUser({ userId }) {
//   try {
//     const {rows:carts} = await client.query(`
//      SELECT *
//      FROM carts
//      JOIN users ON carts."userId"=users.id
//      WHERE "userId" = $1 AND "isPurchased"=true
//     `, [userId])
//     return await addItemToCart(carts)
//   } catch(error){
//     throw error
//   }
// }

async function getAllUnpurchasedCartsByUser({ userId }) {
  try {
    const { rows: carts } = await client.query(
      `
       SELECT *
       FROM carts
       JOIN users ON carts."userId"=users.id
       JOIN "orderItems" ON "orderItems"."cartId" = carts.id
      JOIN "products" ON "orderItems"."productId" = products.id
       WHERE "userId" = $1 AND "isPurchased"=false
      `,
      [userId]
    );
    return await addItemToCart(carts);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createCart,
  getCartById,
  // getAllCartsByUser,
  // getAllPurchasedCartsByUser,
  getAllUnpurchasedCartsByUser,
};
