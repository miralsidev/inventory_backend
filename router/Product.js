const router = require('express').Router();

const ProductController = require("../controllers/Product")
router.post("/addProduct", ProductController.addProduct)
router.get("/getProduct", ProductController.getProduct)

module.exports = router     
