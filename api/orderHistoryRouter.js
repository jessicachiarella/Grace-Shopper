const express = require("express");
const { getOrderHistoryByUserId } = require("../db");
const router = express.Router();
const { requireUser } = require("./utils");

router.get("/:userId", requireUser, async (req, res, next) => {
  
    let {userId} = req.params
      try {
        const orderHistory = await getOrderHistoryByUserId(userId);
        console.log(orderHistory, "this is orderHist")
        res.send(orderHistory);
      } catch ({ name, message }) {
        next({ name, message });
      }
    });


module.exports = router;