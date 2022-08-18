const express = require("express");
const { createCart, getCartById, getAllUnpurchasedCartsByUser, updatePurchaseCart } = require("../db");
const router = express.Router();
const { requireUser } = require("./utils");
console.log("request to /cart is being made")

router.get("/:userId", async (req, res, next) => {
  
  let {userId} = req.params
    try {
      const cart = await getCartById(userId);
  
      res.send(cart);
    } catch ({ name, message }) {
      next({ name, message });
    }
  });

router.get("/unpurchasedCart/:userId", async (req, res, next) => {
    let {userId} = req.params
      try {
        const cart = await getAllUnpurchasedCartsByUser(userId);
        res.send(cart);
      } catch ({ name, message }) {
        next({ name, message });
      }
    });
  
router.post("/:userId", async (req, res, next) => {
    let {userId} = req.params
  
    try {
      const cart = await createCart({userId});
      res.send(cart);
    } catch ({ name, message }) {
      next({ name, message });
    }
  });


  router.patch("/:cartId", async (req, res, next) => {
    const { cartId } = req.params;
    console.log(cartId, "this is from api Router")
    try {
      const updatedIsPurchased = await updatePurchaseCart(cartId);
      console.log(updatedIsPurchased, "this is updatedispur")
      res.send(updatedIsPurchased);
  
    } catch ({ name, message }) {
      next({ name, message });
    }
  });

  module.exports = router;