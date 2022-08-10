const client = require("./client");


async function createOrderHistory({ cartId, datePurchased }) { 
    const {rows:[orderHistory]}  = await client.query(`
      INSERT INTO orderHistory("cartId", "datePurchased")
      VALUES ($1, $2)
      RETURNING *;
    `, [cartId, datePurchased]);
    
    return orderHistory;
  }


module.exports = {
    createOrderHistory
}