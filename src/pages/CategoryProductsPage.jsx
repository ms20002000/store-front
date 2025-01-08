import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import Product from "../components/Product";

const CategoryProductsPage = () => {
  const { name } = useParams(); 
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const apiUrl = `/api/menu/category/products/${name}/`;
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.log("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [name]);

  return (
    <section className="bg-gray-50 px-4 py-10">
      <div className="container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          Products for Category {name}
        </h2>
        {loading ? (
          <Spinner loading={loading} />
        ) : products.length > 0 ? (
         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            { products.map((product) => (
                <Product key={product.id} product={product} />
            )) }
          </div>
        ) : (
          <p className="text-center text-gray-500">No products found.</p>
        )} 
      </div>
    </section>
  );
};

export default CategoryProductsPage;
