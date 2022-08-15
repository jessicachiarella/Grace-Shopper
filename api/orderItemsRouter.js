const express = require("express");
const {  createOrderItem,
    updateOrderItem,
    destroyOrderItem, 
    getOrderItemById,
    getCartByCartId,
    } = require("../db");
const router = express.Router();
const { requireUser } = require("./utils");

router.post("/:cartId/addToCart", async (req, res, next) => {
    const {cartId} = req.params
    const { productId, quantity, price } = req.body;
    const itemData = {};
   //question for Ed... how do we keep duplicate products from being added to cart???
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

  //need to figure out how to verify a logged in user and then handle when a guest user is updating their cart
  router.patch("/:orderItemId", async (req, res, next) => {
    const { orderItemId } = req.params;
    const { quantity } = req.body;
    try {
      // const orderItem = await getOrderItemById(orderItemId);
      // const usersCart = await getCartByCartId(orderItem.cartId);
      // console.log(usersCart.userId, "this is usersCart.userId!!!!!!!!!!!")
      //   console.log(req.user, "req.user!!!!!!!!!!!")
      // if (req.user.id != usersCart.userId) {
      //   res.status(403);
      //   next({
      //     name: "CartUpdateError",
      //     message: "No soup for you!",
      //   });
      // } else {
        const updatedQuantity = await updateOrderItem( orderItemId, quantity);
        res.send(updatedQuantity);
      // }
    } catch ({ name, message }) {
      next({ name, message });
    }
  });

  //same as above, need to handle user authentication and guest user for delete
  router.delete("/:orderItemId", async (req, res, next) => {
    const { orderItemId } = req.params;
  
    try {
    //   const routineAct = await getRoutineActivityById(routineActivityId);
    //   const routine = await getRoutineById(routineAct.id);
    //   if (routine.creatorId !== req.user.id) {
    //     res.status(403);
    //     next({
    //       name: "User not found",
    //       message: `User ${req.user.username} is not allowed to delete ${routine.name}`,
    //     });
    //   } else {
       const destroyedItem =  await destroyOrderItem(orderItemId);
        res.send(destroyedItem);
    //   }
    } catch ({ name, message }) {
      next({ name, message });
    }
  });


module.exports = router;