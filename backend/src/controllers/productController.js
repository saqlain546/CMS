const Product = require('../database/models/Product');

const getAllProducts = async (req, res) => {
    try {
        const allProducts = await Product.find();
        res.status(200).json(allProducts);
    } catch (error) {
        console.log("Error", error.message);
    }
}

const getProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        res.status(201).json(product);
    } catch (error) {
        console.log("Error", error.message);
    }
}

const createProduct = (req, res) => {
    try {
        const { name, price, description } = req.body;
        if(!name || !price)  {
            res.status(403).send("Some required fields were empty");
        }
        const customer = Product.create({
            name,
            price,
            description,
        })
        res.status(200).send("Product was created sucessfully");
    } catch (error) {
        console.log("Error", error.message);
    }
}

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const { name, price, description } = req.body;
        const product = await Product.findByIdAndUpdate(productId, {
            name: name,
            price: price,
            description: description,
        })
        if(product){
            res.status(201).send('Product was updated successfully');
        }
        res.status(404).send(`Product with id ${productId} was not found`);
    } catch (error) {
        console.log("Error", error.message);
    }
}

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findByIdAndDelete(productId)
        if(product){
            res.status(201).send('Product was deleted successfully');
        }
        res.status(404).send(`Product with id ${productId} was not found`);
    } catch (error) {
        console.log("Error", error.message);
    }
}

module.exports = {
    createProduct,
    getAllProducts,
    getProduct,
    updateProduct,
    deleteProduct,
}