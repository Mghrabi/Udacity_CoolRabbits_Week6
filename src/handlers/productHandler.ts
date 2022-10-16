import { Application, Request, Response } from "express";
import { Product, ProductModel } from "../models/productModel";
import { authorizationMiddleWare } from "../utilities/authorization";

//needs return type
const createProductHandler = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    // console.log("hit products/signup");
    const { name, price, category }: Product = req.body;
    const Product = new ProductModel();
    const product = await Product.create({
      name,
      price,
      category,
    });
    //give a token
    return res.send({ ...product });
  } catch (err: unknown) {
    return res.status(400).send(`err in creating product, ${err} `);
  }
};


const getAllProductsHandler = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    // console.log("hit products/index");
    const product = new ProductModel();
    const products = await product.index();
    return res.send(products);
  } catch (err: unknown) {
    return res.status(400).send(`err in getting all products, err: ${err} `);
  }
};

//[Optional]
const getOneProductByIdHandler = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    // console.log("hit products/show/:productId");
    const Product = new ProductModel();
    const product = await Product.show(req.params.productId);
    if (!product) {
      return res.status(400).send("no product found with this productId");
    }
    return res.send(product);
  } catch (err: unknown) {
    return res.status(400).send(
      `err in getting product with Id ${req.params.productId}, err: ${err} `
    );
  }
};

const getOneProductByCategoryHandler = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    // console.log("hit products/categories/:category");
    const Product = new ProductModel();
    const product = await Product.fetchByCategory(req.params.category);
    // if (!product) {
    //   return res.send("no product found with this category");
    // }
    return res.send(product);
  } catch (err: unknown) {
    return res.status(400).send(
      `err in getting product with category ${req.params.productId}, err: ${err} `
    );
  }
};

const productRouter = (app: Application): void => {
  app.post("/products/create", authorizationMiddleWare, createProductHandler);
  //   app.post("/products/delete/:productId", authorizationMiddleWare, deleteproductHandler);
  app.get("/products/index", getAllProductsHandler);
  app.get("/products/show/:productId", getOneProductByIdHandler);
  //[Optional]
  app.get("/products/categories/:category", getOneProductByCategoryHandler);
};

export default productRouter;
