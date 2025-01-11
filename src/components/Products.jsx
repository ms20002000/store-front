import Product from './Product';
import { useState, useEffect } from 'react';
import Spinner from './Spinner';

const Products = ({ isHome = false }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const apiUrl = isHome 
        ? `/api/menu/products/?limit=4&page=${currentPage}` 
        : `/api/menu/products/?page=${currentPage}`;
        
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        setProducts(data.results);
        setNextPage(data.next);  // اینجا مقدار nextPage به داده بعدی تنظیم می‌شود

      } catch (error) {
        console.log('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [isHome, currentPage]);

  const handleNextPage = () => {
    if (nextPage) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          {isHome ? 'Products' : 'All Products'}
        </h2>
        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {products.map((product) => (
                <Product key={product.id} product={product} />
              ))}
            </div>
            {!isHome && (
              <div className="flex justify-center mt-4">
                <button 
                  className={`px-4 py-2 mx-2 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'bg-indigo-500 text-white'}`} 
                  onClick={handlePrevPage} 
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <button 
                  className={`px-4 py-2 mx-2 ${!nextPage ? 'opacity-50 cursor-not-allowed' : 'bg-indigo-500 text-white'}`} 
                  onClick={handleNextPage} 
                  disabled={!nextPage}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;
