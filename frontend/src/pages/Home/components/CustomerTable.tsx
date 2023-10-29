import { useState, useEffect } from 'react';
import axios from 'axios';

type Customer = {
    _id: string;
    name: string;
    totalOrders: number;
}

function CustomerTable() {
    const [customers, setCustomers] = useState<Customer[]>()
    const fetchCustomerData = async () => {
        try {
          const response = await axios.get(
            'http://localhost:5080/cms-api/customer/order-summary',
            );
            setCustomers(response.data)
        } catch (error) {
          console.error(error);
        }
      }

      useEffect(() => {
        fetchCustomerData();
    }, []);    
  return (
    <>
        <h5>CUSTOMERS: </h5>
        <div className='card card-body'>
            <table className="table table-sm table-striped">
            <thead>
                <tr>
                    <th>Customer</th>
                    <th>Orders</th>
                </tr>
            </thead>
            <tbody>
                { customers && customers.map((customer) => 
                    <tr key={customer._id}>
                        <td>{customer.name}</td>
                        <td>{customer.totalOrders}</td>
                    </tr>
                )}
            </tbody>
            </table>
        </div>
    </>
  )
}

export default CustomerTable