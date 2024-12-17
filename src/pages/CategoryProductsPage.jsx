import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

const CategoryProductsPage = () => {
  const { name } = useParams(); 
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(name)

  useEffect(() => {
    const fetchProducts = async () => {
      const apiUrl = `/api/menu/category/products/${name}/`;
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        setProducts(data);
        console.log(data)
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md p-4"
              >
                <img
                  className="w-full h-48 object-cover rounded-lg mb-4"
                  src={product.product_photo}
                  alt={product.name}
                />
                <h3 className="text-xl font-bold">{product.name}</h3>
                <p className="text-gray-500">{product.brand}</p>
                <p className="text-indigo-600 font-bold">${product.price}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No products found.</p>
        )}
      </div>
    </section>
  );
};

export default CategoryProductsPage;
