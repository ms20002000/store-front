import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import Product from '../components/Product';
import Spinner from '../components/Spinner';



const SearchResults = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);       
  const results = location.state?.results || [];

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          Search Result 
        </h2>
            {loading ? (<Spinner loading={loading} />):( 
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            { results.map((product) => (
                <Product key={product.id} product={product} />
            )) }
            </div>
            )}
    
      </div>
    </section>
  );
};

export default SearchResults