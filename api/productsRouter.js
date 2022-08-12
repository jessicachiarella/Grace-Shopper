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
        const {productId } = req.params
        const products = await getProductsByCategoryId({ id: productId })
        res.send(products)``
    } catch (error) {
        next(error);
    }
})

module.exports = productsRouter;