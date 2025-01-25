const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: String,
    price: Number,
    description: String,
    image: String
},{
    timestamps: true,
    versionKey: false
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;