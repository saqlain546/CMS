import CustomerTable from '@pages/Home/components/CustomerTable'
import OrderSummary from './components/OrderSummary'
import OrderTable from '@pages/Home/components/OrderTable'


function index() {
  return (
    <>
      <OrderSummary/>
      <div className="row g-4 mt-4" style={{ margin: '5rem'}}>
        <div className="col-md-4">
          <CustomerTable/>
        </div>
        <div className="col-md-8">
          <OrderTable/>
        </div>
      </div>  
    </>
  )
}

export default index