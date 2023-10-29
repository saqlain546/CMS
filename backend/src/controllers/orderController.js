const Order = require('../database/models/Order');
const Product = require('../database/models/Product');
const Customer = require('../database/models/Customer');

const getAllOrders = async (req, res) => {
    try {
        const allOrders = await Order.find().populate('product');
        res.status(200).json(allOrders);
    } catch (error) {
        console.log("Error", error.message);
    }
}

const orderSummary = async (req, res) => {
    try {
        const total = await Order.count()
        const delivered = await Order.find({ status: 'Delivered'}).count();
        const pending = await Order.find({ status: 'Pending'}).count();
        const summary = {
            total,
            delivered,
            pending,
        }
        res.status(201).json(summary);
    } catch (error) {
        console.log("Error", error.message);
    }
}



const getOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findById(orderId).populate('customer').populate('product');
        res.status(201).json(order);
    } catch (error) {
        console.log("Error", error.message);
    }
}

const createOrder = async (req, res) => {
    try {
        const { status, customerId, productId } = req.body;
        if(!status || !customerId || !productId)  {
            res.status(403).send("Some required fields were empty");
        }
        const customer = await Customer.findById(customerId);
        const product = await Product.findById(productId);

        await Order.create({
            status,
            customer: customer,
            product: product,
        })
        res.status(200).send("Order was created sucessfully");
    } catch (error) {
        console.log("Error", error.message);
    }
}

const updateOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const { status, customerId, productId } = req.body;
        console.log(status, customerId);

        const customer = await Customer.findById(customerId);
        const product = await Product.findById(productId);

        const order = await Order.findByIdAndUpdate(orderId, {
            status: status,
            customer: customer,
            product: product,
        })

        if(order){
            res.status(201).send('Order was updated successfully');
        }
        res.status(404).send(`Order with id ${orderId} was not found`);
    } catch (error) {
        console.log("Error", error.message);
    }
}

const deleteOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findByIdAndDelete(orderId);
        if(order){
            res.status(201).send('Order was deleted successfully');
        }
        res.status(404).send(`Order with id ${orderId} was not found`);
    } catch (error) {
        console.log("Error", error.message);
    }
}

module.exports = {
    getAllOrders,
    orderSummary,
    createOrder,
    getOrder,
    updateOrder,
    deleteOrder,
}