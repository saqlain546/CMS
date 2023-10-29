import { useState, useEffect } from 'react';
import axios from 'axios';

// enum Category {
//     Indoor = 'Indoor',
//     Outdoor = 'Outdoor',
// }

type Product = {
    _id: string;
    name: string;
    price: number;
    description: string;
    // category: Category;
    createdAt: string;
}

function index() {
    const [products, setProducts] = useState<Product[]>()
    const fetchAllProducts = async () => {
        try {
          const response = await axios.get(
            'http://localhost:5080/cms-api/product',
            );
            setProducts(response.data)
        } catch (error) {
          console.error(error);
        }
      }

      useEffect(() => {
        fetchAllProducts();
    }, []);  
  return (
    <>
    
    <h5 className='m-5'>All Products: </h5>
    <table className="table table-sm m-5">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th>Created At</th>
                </tr>
            </thead>
            <tbody>
                { products && products.map((product) => 
                    <tr key={product._id}>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product['description'].slice(0,50)}...</td>
                        <td>{product['createdAt'].slice(0,10)}</td>
                    </tr>
                )}
            </tbody>
        </table>
    </>
  )
}

export default index