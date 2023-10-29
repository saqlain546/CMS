const Customer = require('../database/models/Customer');

const getAllCustomers = async (req, res) => {
    try {
        const allCustomers = await Customer.find();
        res.json(allCustomers);
    } catch (error) {
        console.log("Error", error.message);
    }
}

const getAllCustomersWithOrders = async (req, res) => {
    const customer = await Customer.aggregate([
        {
          $lookup: {
            from: 'orders', // The name of the orders collection
            localField: '_id',
            foreignField: 'customer',
            as: 'customerOrders',
          },
        },
        {
          $project: {
            name: 1,
            totalOrders: { $size: '$customerOrders' },
          },
        },
      ]).exec();
      res.json(customer)
}

const getCustomer = async (req, res) => {
    try {
        const customerId = req.params.id;
        const customer = await Customer.findById(customerId);
        res.status(201).json(customer);
    } catch (error) {
        console.log("Error", error.message);
    }
}

const createCustomer = (req, res) => {
    try {
        const { name, phone, email } = req.body;
        if(!name || !phone || !email)  {
            res.status(403).send("Some required fields were empty");
        }
        const customer = Customer.create({
            name,
            phone,
            email,
        })
        res.status(200).send("Customer was created sucessfully");
    } catch (error) {
        console.log("Error", error.message);
    }
}

const updateCustomer = async (req, res) => {
    try {
        const customerId = req.params.id;
        const { name, phone, email } = req.body;
        const customer = await Customer.findByIdAndUpdate(customerId, {
            name: name,
            phone: phone,
            email: email,
        })
        if(customer){
            res.status(201).send('Customer was updated successfully');
        }
        res.status(404).send(`Customer with id ${customerId} was not found`);
    } catch (error) {
        console.log("Error", error.message);
    }
}

const deleteCustomer = async (req, res) => {
    try {
        const customerId = req.params.id;
        const customer = await Customer.findByIdAndDelete(customerId);
        if(customer){
            res.status(201).send('Customer was deleted successfully');
        }
        res.status(404).send(`Customer with id ${customerId} was not found`);
    } catch (error) {
        console.log("Error", error.message);
    }
}

module.exports = {
    getAllCustomers,
    getAllCustomersWithOrders,
    createCustomer,
    getCustomer,
    updateCustomer,
    deleteCustomer,
}