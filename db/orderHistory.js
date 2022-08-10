const client = require("./client");


async function createOrderHistory({ cartId }) { 
    const {rows:[orderHistory]}  = await client.query(`
      INSERT INTO "orderHistory"("cartId")
      VALUES ($1)
      RETURNING *;
    `, [cartId]);
    
    return orderHistory;
  }


module.exports = {
    createOrderHistory
}