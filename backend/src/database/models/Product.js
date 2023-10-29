const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: String,
    price: Number,
    category: {
        type: String,
        enum: ['Indoor', 'Outdoor'],
    },
    description: String,
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    },
})

module.exports = mongoose.model("Product", ProductSchema);