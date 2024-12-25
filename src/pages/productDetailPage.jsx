import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import axios from "axios";

const ProductDetailPage = () => {
  const { productName } = useParams(); 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      const apiUrl = `/api/menu/products/${productName}/`;
      try {
        const res = await axios.get(apiUrl); 
        const data = res.data; 
        console.log(data);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProductDetails();
  }, [productName]);
  
  if (loading) {
    return <Spinner loading={loading} />;
  }
  
  if (!product) {
    return <p className="text-center text-gray-500">Product not found.</p>;
  }

  return (
    <section className="bg-gray-50 px-4 py-10">
      <div className="container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          {product.name}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {product.product_file.map((file, index) => (
              <div key={index} className="flex flex-col items-center">
                {file.product_photo && (
                  <img
                    className="w-full h-64 object-cover rounded-lg"
                    src={file.product_photo}
                    alt={`Product Photo ${index + 1}`}
                  />
                )}
                {file.product_movie && (
                  <video
                    className="w-full mt-4 rounded-lg"
                    controls
                    src={file.product_movie}
                  >
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4">Details</h3>
            <p className="mb-2">
              <strong>Teacher:</strong> {product.teacher}
            </p>
            <p className="mb-2">
              <strong>Price:</strong> ${product.price}
            </p>
            <p className="mb-2">
              <strong>Description:</strong> {product.description}
            </p>
            <p className="mb-2">
              <strong>Category:</strong> {product.category.name}
            </p>
            {product.discount && (
              <p className="mb-2">
                <strong>Discount:</strong> {product.discount.name}
              </p>
            )}
            <p className="mb-2">
              <strong>Course Time:</strong> {product.course_time}
            </p>
            <p className="mb-2">
              <strong>Prerequisite:</strong> {product.prerequisite}
            </p>

            <h3 className="text-2xl font-bold mt-6 mb-4">Topics</h3>
            {product.product_topic_file.length > 0 ? (
              <div className="space-y-4">
                {product.product_topic_file.map((topic, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-md p-4"
                  >
                    <h4 className="text-lg font-bold">{topic.name}</h4>
                    <p className="text-gray-500">{topic.description}</p>
                    {topic.product_photo && (
                      <img
                        className="w-full h-48 object-cover rounded-lg mt-4"
                        src={topic.product_photo}
                        alt={topic.name}
                      />
                    )}
                    {topic.product_movie && (
                      <video
                        className="w-full mt-4 rounded-lg"
                        controls
                        src={topic.product_movie}
                      >
                        Your browser does not support the video tag.
                      </video>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No topics available.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailPage;
