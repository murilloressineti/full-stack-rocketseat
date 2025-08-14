import { Router } from "express";
import { myMiddleware } from "../middlewares/my-middleware";
import { ProductsControler } from "../controllers/products-controller";

const productsRoutes = Router();
const productsControler = new ProductsControler();

productsRoutes.get("/", productsControler.index);

// Middleware local em uma rota específica.
productsRoutes.post("/", myMiddleware, productsControler.create);

export { productsRoutes };
