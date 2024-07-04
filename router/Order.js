const router = require('express').Router();

const OrderController = require("../controllers/Order");
const { userAuth } = require('../middleware/UserAuth');
router.post("/addOrder", userAuth, OrderController.AddOrder)
router.post('/AddCart', userAuth, OrderController.AddCart)
router.get('/ShowCart', userAuth, OrderController.ShowCart)


module.exports = router     
