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

async function getOrderItemById ({id}){
  try{
    const {rows:[orderItems],} = await client.query(`
    SELECT * 
    FROM "orderItems"
    WHERE id = $1;
    `,[id]);

    return orderItems
} catch(error){
    throw error
}
}

async function addItemToCart(cartId, productId, quantity, price) {
  try {
    const { rows: orderItems } = await client.query(
      `
       INSERT INTO "orderItems"("cartId", "productId", quantity, price)
       VALUES ($1, $2, $3, $4)
       RETURNING *;
     `,
      [cartId, productId, quantity, price]
    );
    
    return orderItems;
  } catch (error) {
    throw error;
  }
}

async function updateOrderItem({ id, ...fields }) {
  const setString = Object.keys(fields).map(
    (key, index) => `"${key}"=$${index + 1}`
    ).join(',') 
    try {
    if (setString.length > 0){
      await client.query(`
      UPDATE "orderItems"
      SET ${setString}
      WHERE "orderItems".id = ${id}
      RETURNING *;
      `, Object.values(fields)) 
    }
    return await getOrderItemById(id) 
    } catch(error){
      throw error
    }
}

async function destroyOrderItem(id) {
  try {
    const {rows:[orderItem]} = await client.query(`
    DELETE 
    FROM "orderItems"
    WHERE "orderItems".id = $1
    RETURNING *
    `, [id])
    
    return orderItem
  } catch(error){
    throw error
  }
}


module.exports = {
    createOrderItem,
    getOrderItemById,
    addItemToCart,
    updateOrderItem,
    destroyOrderItem
}