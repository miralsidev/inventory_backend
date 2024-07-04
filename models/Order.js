const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema({
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            }
        }
    ],
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true,
        default: null,
    },
    status: {
        type: String,
        required: true,
        default: "Pending",
    }
}, { timestamps: true });

const Order = mongoose.model('Order', OrderSchema);
module.exports = { Order };
