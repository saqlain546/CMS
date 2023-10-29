const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const colors = require('colors');

const customerRoutes = require('./src/routes/customerRoutes');
const productRoutes = require('./src/routes/productRoutes');
const orderRoutes = require('./src/routes/orderRoutes');

dotenv.config();
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Mongo DB Server connected".cyan))
.catch((error) => console.log("Error connecting to Mongo DB Server".red, error.message));

const port = process.env.PORT || 5080
const app = express()
const corsOptions = { 
    origin: process.env.URL || 'http://localhost:5173',
    credentials: true, 
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/cms-api/customer', customerRoutes);
app.use('/cms-api/product', productRoutes);
app.use('/cms-api/order', orderRoutes);

app.listen(port, () => console.log(`Server started on port ${port}`));