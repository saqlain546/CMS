import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

type Order = {
    status: string;
    customer: {
        _id: string;
        name: string;
    },
    product: {
        _id: string;
        name: string;
    }
}

function index() {
    const { id } = useParams();
    const navigate = useNavigate()
    const [order, setOrder] = useState<Order>();
    const [status, setStatus] = useState('');
    const getOrder = async (id: string | undefined) => {
        try {
          const response = await axios.get(
            `http://localhost:5080/cms-api/order/${id}`,
            );
            console.log(response.data);
            setOrder(response.data)
        } catch (error) {
          console.error(error);
        }
      }

    const handleSubmit = async (event: React.FormEvent<HTMLDivElement>) => {
        event.preventDefault();
        try {
            const response = await axios.put(
              `http://localhost:5080/cms-api/order/${id}`,
              { 
                    status: status,
                    customerId: order?.customer._id,
                    productId: order?.product._id
              }
              );
              if(response.status === 201){
                navigate('/');
              }
          } catch (error) {
            console.error(error);
          }
    }

    useEffect(() => {
        getOrder(id);
    }, [])

    if(!order) {
        return <p>Loading...</p>
    }
  return (
    <div className="card mt-5" style={{ maxWidth: '50rem', marginRight: 'auto', marginLeft: 'auto'}}>
      <div className='row mt-5 mx-5 d-flex flex-column align-items-center' onSubmit={handleSubmit}>
          <h5 className='col-4'>Update Order Status: </h5>
          <form className='col-4 m-4' style={{width: '70%'}}>
              <label htmlFor="status">Current Status: {order?.status}</label>
              <select className="form-control" id='status' required onChange={(e)=>setStatus(e.target.value)}>
                <option disabled selected>Click here to change status</option>
                  <option value="Pending">Pending</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
              </select>
              <label htmlFor="product" className='mt-2'>Product:</label>
              <p id='product'>{order?.product.name}</p>
              <label htmlFor="customer">Customer</label>
              <p id='customer'>{order?.customer.name}</p>
              <button type="submit" className="btn btn-primary mt-2">Submit</button>
          </form>
      </div>
    </div>  
  )
}

export default index