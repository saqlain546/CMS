import Header from "@components/Header";
import { Routes, Route } from 'react-router-dom';
import Home from '@pages/Home';
import UpdateOrder from "@pages/UpdateOrder";
import CreateOrder from "@pages/CreateOrder";
import Products from "@pages/Products";

function App() {

  return (
    <>
      <Header/>
      <Routes>
          <Route path="/">
            <Route index element={<Home />}/>
            <Route path="/order/:id" element={<UpdateOrder/>} />
            <Route path="/create" element={<CreateOrder/>} />
            <Route path="/products" element={<Products/>} />
          </Route>
      </Routes>
    </>
  )
}

export default App
