const { Product } = require('../models/Product')
const {productSchema} = require('../validation/Product')
const addProduct = async (req, res) => {
    try {
        const { error, value } = productSchema.validate(req.body);
        if (error) {
            return res.json({
                status: 400,
                message: error.details[0].message 
            });
        }
        const { name, description, price, quantity } = value;
        const data = new Product({
            name:name,
            description:description,
            price:price,
            quantity:quantity
        })
        await data.save()
        return res.json({
            status:200,
            message:'add data succesfully'
        })
    } catch(error) {
        console.log(error);
        return res.json({ status: 500, message: "intrnal server error" });
    }
}
const getProduct = async (req, res) => {

    try {
      const products = await Product.find();
      res.json(products);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};

module.exports = { addProduct,getProduct }