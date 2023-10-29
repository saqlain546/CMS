import axios from 'axios';
import { useState, useEffect } from 'react';

type Summary = {
    total: number,
    delivered: number,
    pending: number,
}

function OrderSummary() {
    const [summary, setSummary] = useState<Summary>();

    const fetchSummary = async () => {
        try {
          const response = await axios.get(
            'http://localhost:5080/cms-api/order/summary',
            );
            setSummary(response.data)
        } catch (error) {
          console.error(error);
        }
      }

    useEffect(() => {
        fetchSummary();
    }, []);  
  return (
    <div className="container text-center mt-4">
        <div className="row gx-4 gy-2">
            <div className="col-md-4">
                <div className="card text-bg-info mb-3" style={ {minWidth: '14rem'}}>
                    <h4 className="card-header">Total Orders</h4>
                    <div className="card-body">
                        <h4 className="card-title">{summary?.total}</h4>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className="card text-bg-info mb-3" style={ {minWidth: '14rem'}}>
                    <h4 className="card-header">Orders Delivered</h4>
                    <div className="card-body">
                        <h4 className="card-title">{summary?.delivered}</h4>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className="card text-bg-info mb-3" style={ {minWidth: '14rem'}}>
                    <h4 className="card-header">Orders Pending</h4>
                    <div className="card-body">
                        <h4 className="card-title">{summary?.pending}</h4>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default OrderSummary