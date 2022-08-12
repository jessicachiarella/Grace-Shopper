const {client} = require("./client");


async function createOrderHistory({ cartId }) { 
    const {rows:[orderHistory]}  = await client.query(`
      INSERT INTO "orderHistory"("cartId")
      VALUES ($1)
      RETURNING *;
    `, [cartId]);
    
    return orderHistory;
  }

async function getOrderHistoryByUserId( userId ){
 try{ 
  const {rows:[orderHistory]}  = await client.query(`
    SELECT *
    FROM "orderHistory"
    JOIN carts ON "orderHistory"."cartId" = carts.id
    JOIN "orderItems" ON "orderItems"."cartId" = carts.id
    JOIN "products" ON "orderItems"."productId" = products.id
    WHERE carts."userId" = $1 AND carts."isPurchased" = true
  `, [userId])
console.log(orderHistory, "THIS IS MY ORDER HISTORY !!!")
  return orderHistory
} catch(error){
  throw error
}
}


module.exports = {
    createOrderHistory,
    getOrderHistoryByUserId
}
