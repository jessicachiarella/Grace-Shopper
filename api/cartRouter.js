const express = require("express");
const { createCart, getCartById, getAllUnpurchasedCartsByUser } = require("../db");
const router = express.Router();
const { requireUser } = require("./utils");

router.get("/:userId", async (req, res, next) => {
  console.log("am i here??????")
  let {userId} = req.params
    try {
      const cart = await getCartById(userId);
  
      res.send(cart);
    } catch ({ name, message }) {
      next({ name, message });
    }
  });
  
  router.post("/cart", requireUser, async (req, res, next) => {
    const { name, goal, isPublic } = req.body;
    const routineData = {};
    try {
      routineData.name = name;
      routineData.goal = goal;
      routineData.isPublic = isPublic;
      routineData.creatorId = req.user.id;
      const routine = await createRoutine(routineData);
      res.send(routine);
    } catch ({ name, message }) {
      next({ name, message });
    }
  });

  module.exports = router;