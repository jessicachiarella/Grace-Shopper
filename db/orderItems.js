const client = require("./client");

//need to address price
async function createOrderItem({ cartId, productId, quantity=1, price }) { 
    const {rows:[orderItem]}  = await client.query(`
      INSERT INTO "orderItems"("cartId", "productId", quantity, price)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `, [cartId, productId, quantity, price]);
    
    return orderItem;
  }


module.exports = {
    createOrderItem
}