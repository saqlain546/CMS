const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    status: {
        type: String,
        enum: ['Pending', 'Out for Delivery', 'Delivered'],
      },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now()
      },
    updatedAt: {
        type: Date,
        default: () => Date.now()
      },
    customer : {
        type: mongoose.Types.ObjectId, 
        ref: "Customer"
    },
    product: {
        type: mongoose.Types.ObjectId, 
        ref: "Product"
    }
})

module.exports = mongoose.model("Order", OrderSchema);