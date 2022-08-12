const express = require("express");
const {  createOrderHistory,
    getOrderHistoryByUserId} = require("../db");
const router = express.Router();
const { requireUser } = require("./utils");

router.get("/:userId", async (req, res, next) => {
  
    let {userId} = req.params
      try {
        const orderHistory = await getOrderHistoryByUserId(userId);
    
        res.send(orderHistory);
      } catch ({ name, message }) {
        next({ name, message });
      }
    });


module.exports = router;