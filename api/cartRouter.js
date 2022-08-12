const express = require("express");
const { createCart, getCartById, getAllUnpurchasedCartsByUser } = require("../db");
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

  module.exports = router;