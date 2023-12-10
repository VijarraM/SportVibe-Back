const { Router } = require("express");
const router = Router();
const postProduct = require("../controllers/product/postProduct");
const getProductByPk = require("../controllers/Product/getProductByPk");
const getProduct = require("../controllers/Product/getProduct");
const deleteProductByPk = require("../controllers/Product/deleteProductByPk");
const putProductbyID = require("../controllers/Product/putProductbyID");

router.post("/product", postProduct);

router.get("/product", getProduct);

router.get("/detail/:id", getProductByPk);

router.delete("/deleteProduct/:id", deleteProductByPk);

router.put("/product/:id", putProductbyID);

module.exports = router;
