"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const productModel_1 = require("../models/productModel");
const authorization_1 = require("../utilities/authorization");
//needs return type
const createProductHandler = async (req, res) => {
    try {
        // console.log("hit products/signup");
        const { name, price, category } = req.body;
        const Product = new productModel_1.ProductModel();
        const product = await Product.create({
            name,
            price,
            category,
        });
        //give a token
        return res.send({ ...product });
    }
    catch (err) {
        return res.status(400).send(`err in creating product, ${err} `);
    }
};
const getAllProductsHandler = async (req, res) => {
    try {
        // console.log("hit products/index");
        const product = new productModel_1.ProductModel();
        const products = await product.index();
        return res.send(products);
    }
    catch (err) {
        return res.status(400).send(`err in getting all products, err: ${err} `);
    }
};
//[Optional]
const getOneProductByIdHandler = async (req, res) => {
    try {
        // console.log("hit products/show/:productId");
        const Product = new productModel_1.ProductModel();
        const product = await Product.show(req.params.productId);
        if (!product) {
            return res.status(400).send("no product found with this productId");
        }
        return res.send(product);
    }
    catch (err) {
        return res.status(400).send(`err in getting product with Id ${req.params.productId}, err: ${err} `);
    }
};
const getOneProductByCategoryHandler = async (req, res) => {
    try {
        // console.log("hit products/categories/:category");
        const Product = new productModel_1.ProductModel();
        const product = await Product.fetchByCategory(req.params.category);
        // if (!product) {
        //   return res.send("no product found with this category");
        // }
        return res.send(product);
    }
    catch (err) {
        return res.status(400).send(`err in getting product with category ${req.params.productId}, err: ${err} `);
    }
};
const productRouter = (app) => {
    app.post("/products/create", authorization_1.authorizationMiddleWare, createProductHandler);
    //   app.post("/products/delete/:productId", authorizationMiddleWare, deleteproductHandler);
    app.get("/products/index", getAllProductsHandler);
    app.get("/products/show/:productId", getOneProductByIdHandler);
    //[Optional]
    app.get("/products/categories/:category", getOneProductByCategoryHandler);
};
exports.default = productRouter;
