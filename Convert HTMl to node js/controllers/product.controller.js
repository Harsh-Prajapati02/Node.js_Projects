const Product = require("../models/product");

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.render('product',{products});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = getAllProducts;