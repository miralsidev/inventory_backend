const router = require('express').Router();

const UserController = require("../controllers/User")
router.post("/adUser", UserController.addUser)
router.post("/login", UserController.login)

module.exports = router     


