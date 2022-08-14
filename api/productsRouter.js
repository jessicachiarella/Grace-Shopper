const express = require('express');
const productsRouter = express.Router();
const { getAllProducts, getProductsByCategoryId, getProductById } = require('../db');


//GET all products

productsRouter.get("/", async (req, res, next) => {
    try {
        const products = await getAllProducts()
        res.send(products)
    } catch (error) {
        next(error);
    }
})

//GET product by id

productsRouter.get("/productId", async (req, res, next) => {
    try {
        if (! await getProductById(req.params.productId)) {
            res.send({ error: "product error", message: `Product ${req.params.productId} not found`, name: "product error" })
        }
        console.log(getProductById, "get product by id")
        const [productId]  = req.params;
        console.log({productId}, "PRODUCTID")
        const products = await getProductsByCategoryId({ id: productId })
        console.log(products, "THESE ARE PRODUCTS!")
        res.send(products)``
    } catch (error) {
        next(error);
    }
})

// productsRouter.get("/:productyId", async (req, res, next) => {
//     const {productId}  = req.params;
//     console.log({productId}, "PRODUCT ID")
//     try {
//       const product = await getProductById({ id: productId });
//       if (!product.length) {
//         next({
//           name: "ActivityDoesn'tExistError",
//           message: `Activity ${activityId} not found`,
//         });
//       } else {
//         res.send(product);
//       }
//     } catch ({ name, message }) {
//       next({ name, message });
//     }
//   });


module.exports = productsRouter;