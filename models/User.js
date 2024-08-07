const mongoose = require("mongoose");
const userSchemma = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user"
    },
    deleteDate: {
        type: Date,
        default: null
    }
}, { timestamps: true })
const User = mongoose.model("User", userSchemma)
module.exports = { User }