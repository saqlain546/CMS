import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

type Product =  {
        _id: string;
        name: string;
}
type Customer =  {
        _id: string;
        name: string;
}

type Event = React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>

function index() {
    const navigate = useNavigate()
    const [formData, setFromData] = useState({
        status: '',
        customerId: '',
        productId: '',
    });

    console.log("Form Data", formData);

    const [products, setProducts] = useState<Product[]>();
    const [customers, setCustomers] = useState<Customer[]>();

  const onChange = (e: Event) => {
    setFromData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
        const response = await axios.post(
          "http://localhost:5080/cms-api/order",
          { 
                status: formData.status,
                customerId: formData.customerId,
                productId: formData.productId,
          });
          if(response.status === 200){
            navigate('/');
          }
          navigate('/');
      } catch (error) {
        console.error(error);
      }
}

    const getAllCustomers = async () => {
        try {
            const response = await axios.get("http://localhost:5080/cms-api/customer");
            setCustomers(response.data)
        } catch (error) {
            console.error(error);
        }
    }
    const getAllProducts = async () => {
        try {
            const response = await axios.get("http://localhost:5080/cms-api/product");
            setProducts(response.data)
        } catch (error) {
            console.error(error);
        }
    }

     useEffect(() => {
        getAllProducts();
        getAllCustomers();
     },[])

     if (!customers && !products) {
        return <p>Loading...</p>
     }

  return (
    
    <div className="card mt-5" style={{ maxWidth: '50rem', marginRight: 'auto', marginLeft: 'auto'}}>
        
        <div className='row m-5 mx-5 d-flex flex-column align-items-center' >
            <h5 className='col-4'>Create new Order: </h5>
            <form className='col-4' onSubmit={handleSubmit} style={{width: '70%'}}>
                <label htmlFor="status">Status</label>
                <select className="form-control" id='status' name="status" required onChange={onChange}>
                    <option disabled selected>Select status</option>
                    <option value="Pending">Pending</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                </select>
                <label htmlFor="customerId">Customer</label>
                <select className="form-control" id='customerId' name="customerId" required onChange={onChange}>
                    <option disabled selected>Select customer</option>
                    { customers && customers.map((customer) => 
                        <option key={customer._id} value={customer._id}>{customer.name}</option>
                    )}
                </select>

                <label htmlFor="productId">Product</label>
                <select className="form-control" id='productId' name="productId" required onChange={onChange}>
                    <option disabled selected>Select product</option>
                    { products && products.map((product) => 
                        <option key={product._id} value={product._id}>{product.name}</option>
                    )}
                </select>
                <button type="submit" className="btn btn-primary mt-2">Submit</button>
            </form>
        </div>
    </div>
  )
}

export default index