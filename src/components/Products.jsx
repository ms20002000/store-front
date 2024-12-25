import Product from './Product';
import { useState, useEffect } from 'react';
import Spinner from './Spinner';

const Products = ({ isHome=false }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect( () =>{
        const fetchProducts = async () => {
            const apiUrl = isHome ? '/api/menu/products/?limit=4' : '/api/menu/products/'
            try {
                const res = await fetch(apiUrl);
                const data = await res.json();
                setProducts(data)
            } catch (error) {
                console.log('Error fetching data:', error)
            }finally{
                setLoading(false);
            }
        }
        fetchProducts();
    }, [] )
    console.log(products)

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          {isHome ? 'Products' : 'All Products'} 
        </h2>
            {loading ? (<Spinner loading={loading} />):( 
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            { products['results'].map((product) => (
                <Product key={product.id} product={product} />
            )) }
            </div>
            )}
    
      </div>
    </section>
  )
}

export default Products