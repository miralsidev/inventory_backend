const { Cart } = require('../models/Cart');
const { Order } = require('../models/Order');
const { Product } = require('../models/Product');
const { User } = require('../models/User');
const AddOrder = async (req, res) => {
    try {
        const { products, totalAmount } = req.body;
        const updatedProducts = products.map(product => {
            return { ...product, quantity: product.quantity || 1 };
        });
        const finalProducts = [];
        updatedProducts.forEach(product => {
            const existingProduct = finalProducts.find(p => p.productId === product.productId);
            if (existingProduct) {
                existingProduct.quantity += product.quantity;
            } else {
                finalProducts.push(product);
            }
        });
        const { id: user_id } = req.userData;


        const newOrder = new Order({
            products: finalProducts,
            user_id,
            totalAmount,
        });

        const CheckStockLevel = async()=>{
            try {
                const lowStockProducts = await Product.find({ quantity: { $lt: 5 } });
                return lowStockProducts;
            } catch (error) {
                console.error('Error checking stock levels:', error);
                throw error;
            }
        }
        const lowStockProducts = await CheckStockLevel();
        await newOrder.save();
        res.status(200).json(newOrder,lowStockProducts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}
const AddCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.user.id
        const userData = await User.findById(userId)
        if (userData) {
            let cart = await Cart.findOne({ userId: userId });
            console.log('CART=', cart);
            if (!cart) {
                cart = new Cart({
                    userId: userId,
                    items: [{ productId }]
                })
            }
            else {
                const productIndex = cart.items.findIndex(item => item.productId.toString() === productId);
                if (productIndex !== -1) {
                    cart.items[productIndex].quantity += 1;
                } else {
                    cart.items.push({ productId, quantity: 1 });
                }
            }
            cart.totalQuantity = cart.items.reduce((acc, item) => acc + item.quantity, 0);
       
            await cart.save();
            return res.json({
                status: 200,
                message: "Cart updated successfully",
            })
        }
        else {
            return res.json({
                status: 400,
                message: "invalid user data"
            })
        }

    } catch (error) {
        console.log(error.message)
        return res.json({
            status: 500,
            message: "internal server error"
        })
    }
}
const ShowCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const cart = await Cart.findOne({ userId: userId }).populate('items.productId');

        if (!cart) {
            return res.json({
                status: 400,
                message: 'Cart not found'
            });
        }
        return res.json({
            status: 200,
            cart
        });
    } catch (error) {
        console.error('Error fetching cart:', error);
        return res.json({
            status: 500,
            message: 'Server error'
        });
    }
}
module.exports = {
    AddOrder,
    AddCart,
    ShowCart
};
