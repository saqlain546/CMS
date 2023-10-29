const express = require('express');
const { 
    getAllCustomers, createCustomer, getCustomer, 
    updateCustomer, deleteCustomer, getAllCustomersWithOrders,
} = require('../controllers/customerController');

const router = express.Router();

router.get('/', getAllCustomers);
router.get('/order-summary', getAllCustomersWithOrders)
router.get('/:id', getCustomer);


router.post('/', createCustomer);

router.put('/:id', updateCustomer);
router.delete('/:id', deleteCustomer);


module.exports = router;