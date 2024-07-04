const { User } = require('../models/User')
const bcrypt = require('bcrypt')
const jwt  = require('jsonwebtoken')
const addUser = async (req, res) => {
    
    try {
        console.log("hello");
        const { fname, lname, email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User is already Exist' });

        }
        if (fname && lname && email && password) {

            const hashpassword = await bcrypt.hash(password, 10);

            const data = new User({
                fname: fname,
                lname: lname,
                email: email,
                password: hashpassword,
            });
            await data.save();
            res.json({ status: 200, message: "succsessfully..!!" });
            ;

        } else {
            return res.json({ status: 409, message: "all filed are required" });
        }
    } catch (error) {
        console.error(error);
        return res.json({ status: 500, message: "internal server error ", error });
    }
};
const login = async (req, res) => {


    try {
        const { email, password } = req.body;
        console.log(email, password, "email, password")

        const user = await User.findOne({ email })
        console.log(user)
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password)
        console.log(isMatch)

            if (user.email == email && isMatch) {
                const secret = process.env.JWT_SECRATE_KEY
                console.log(secret, "secretsecret")
                console.log(secret)
                const token = jwt.sign({ userId: user._id, userEmail: user.email }, secret, { expiresIn: '5d' });

                console.log(token, "tokentoken")
                return res.json({
                    status: 200,
                    message: "login success",
                    "token": token
                })
            } else {
                return res.json({
                    status: 400,
                    message: 'bad request'
                })
            }
        } else {
            return res.json({
                status: 400,
                message: "user not found"
            });
        }
    } catch (err) {
        console.error(err.message);
        res.json({ status: 500, message: 'Server error' });
    }
};

module.exports = { addUser, login }