const express = require("express");
const {  createOrderItem,
    getOrderItemById,
    addItemToCart,
    updateOrderItem,
    destroyOrderItem, 
    getProductById,
    getCartById, getCartId} = require("../db");
const router = express.Router();
const { requireUser } = require("./utils");

router.post("/:cartId/addToCart", async (req, res, next) => {
    const {cartId} = req.params
    const { productId, quantity, price } = req.body;
    const itemData = {};
  try {
    itemData.cartId = cartId
    itemData.productId = productId;
    itemData.quantity = quantity;
    itemData.price = price;
    const orderItem = await createOrderItem(itemData);
    res.send(orderItem);
    } catch ({ name, message }) {
      next({ name, message });
    }
  });

  router.patch("/:orderItemId", async (req, res, next) => {
    const { orderItemId } = req.params;
    const { quantity } = req.body;
    try {
      const orderItem = await getOrderItemById(orderItemId)
      console.log(orderItem.cartId, "CART ID!!!!!!!!")
      const usersCart = await getCartId(orderItem.cartId);
        console.log(usersCart, "This is USERS CART!!!!!!")
      if (req.user.id != usersCart.userId) {
        res.status(403);
        next({
          name: "CartUpdateError",
          message: "No soup for you!",
        });
      } else {
        const updatedQuantity = await updateOrderItem({
          quantity
        });
        res.send(updatedQuantity);
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  });



module.exports = router;