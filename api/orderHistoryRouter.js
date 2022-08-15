const express = require("express");
const { getOrderHistoryByUserId } = require("../db");
const router = express.Router();
const { requireUser } = require("./utils");

router.get("/:userId", async (req, res, next) => {
  
    let {userId} = req.params
    console.log(userId, "This is our userId from our router")
      try {
        const orderHistory = await getOrderHistoryByUserId(userId);
    console.log(orderHistory, "This is our order history from our router")
        res.send(orderHistory);
      } catch ({ name, message }) {
        next({ name, message });
      }
    });


module.exports = router;