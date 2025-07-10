import express from "express"; 
import { getAllProducts, getSingleProduct, updateProduct, newProduct, deleteProduct, productsHomePage} from "../controllers/products.controller.js";
const router = express.Router();

router.route("/").get(productsHomePage);
router.route("/products").get(getAllProducts);
router.route("/product").get(getSingleProduct);
router.route("/product/update").put(updateProduct);
router.route("/product/new").post(newProduct);
router.route("/product/delete").delete(deleteProduct);

export default router;