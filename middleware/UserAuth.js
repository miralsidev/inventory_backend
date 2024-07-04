const { User } = require("../models/User")
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const userAuth = async (req, res, next) => {
    let token

    const { authorization } = req.headers;
    console.log(authorization, "authorizationauthorization")
    if (authorization && authorization.startsWith('Bearer')) {
        try {
            token = authorization.split(' ')[1]
       
            const { userId } = jwt.verify(token, process.env.JWT_SECRATE_KEY)
        
            req.user = await User.findById(userId)
            if (req.user.role === 'user') {
                next();
            } else {
                return res.json({ status: 400, message: 'invalid admin token' });
            }
        } catch (error) {
            console.log(error.message, "error.messageerror.messageerror.message")
            return res.json({
                status: 400,
                message: "unauthorised user"
            })
        }
    }
    if (!token) {
        return res.json({
            status: 400,
            message: "unauthorised user"
        })
    }
};
module.exports = { userAuth };