import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

type Order = {
    _id: string;
    status: string;
    customer: string;
    product: {
        _id: string;
        name: string;
    }
    createdAt: string;
}

function OrderTable() {
    const [orders, setOrders] = useState<Order[]>()
    const fetchAllOrders = async () => {
        try {
          const response = await axios.get(
            'http://localhost:5080/cms-api/order',
            );
            setOrders(response.data)
        } catch (error) {
          console.error(error);
        }
      }

    const deleteOrder = async (event: React.MouseEvent<HTMLButtonElement>) => {
        const orderId = event.currentTarget.value;
        try {
            const res = await axios.delete(
                `http://localhost:5080/cms-api/order/${orderId}`,
            )
            if(res.status = 201) {
                fetchAllOrders();
            }
        } catch (error) {
            console.error(error);
        }
    }  

      useEffect(() => {
        fetchAllOrders();
    }, []);  
  return (
    <>
        <div style={{ display: 'flex', justifyContent: "space-between"}}>
            <h5>LAST 5 ORDERS: </h5>
            <Link type="button" to={'/create'} className="btn btn-info mb-2">Create New Order</Link>
        </div>
        <div className='card card-body'>
            <table className="table table-sm table-striped">
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Date Ordered</th>
                    <th>Status</th>
                    <th>Update Status</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                { orders && orders.map((order) => 
                    <tr key={order._id}>
                        <td>{order.product.name}</td>
                        <td>{order['createdAt'].slice(0,10)}</td>
                        <td>{order.status}</td>
                        <td><Link type="button" to={`/order/${order._id}`} className="btn btn-warning">Update <EditIcon style={{ color: "white"}}/></Link></td>
                        <td><button type="button" value={order._id} className="btn btn-danger" onClick={(e) => deleteOrder(e)}>Delete <DeleteIcon/></button></td>
                        {/* <td>
                        <select className="form-control">
                            <option disabled selected>Actions</option>
                            <option ><Link type="button" to={`/order/${order._id}`}>Update <ModeEditOutlineIcon/></Link></option>
                            <option ><button type="button" value={order._id} onClick={(e) => deleteOrder(e)}>Delete <DeleteIcon/></button></option>
                        </select>
                        </td> */}
                    </tr>
                )}
            </tbody>
            </table>
        </div>
    </>
  )
}

export default OrderTable