const express = require('express');
const { 
    getAllOrders, orderSummary, createOrder, getOrder,
    updateOrder, deleteOrder,
} = require('../controllers/orderController');

const router = express.Router();

router.get('/', getAllOrders);

router.get('/summary', orderSummary);

router.get('/:id', getOrder)

router.post('/', createOrder);

router.put('/:id', updateOrder);

router.delete('/:id', deleteOrder);

module.exports = router;