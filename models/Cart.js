const { string } = require("joi");
const mongoose = require("mongoose");
const CartSchemma = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    totalQuantity: {
        type: Number,
        default: 0,
        required: true
    },
    items: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, default: 1 }
    }]
}, { timestamps: true })
const Cart = mongoose.model("Cart", CartSchemma)
module.exports = { Cart }
