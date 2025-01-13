import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import axios from "axios";
import Cookies from "js-cookie";
import { useCart } from "../components/Cookies";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const CustomPrevArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute left-2 top-32 transform -translate-y-1/2 text-black rounded-full p-2 hover:bg-zinc-500 z-10"
    >
      &#8592;
    </button>
  );
};

const CustomNextArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute right-2 top-32 transform -translate-y-1/2 text-black rounded-full p-2 hover:bg-zinc-500 z-10"
    >
      &#8594;
    </button>
  );
};

const ProductDetailPage = () => {
  const { productName } = useParams(); 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const settings = {
    dots: true,
    infinite: product?.product_file?.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    customPaging: (i) => (
      <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
    ),
    appendDots: (dots) => (
      <div style={{ position: 'absolute', top: '230px', left: '50%', transform: 'translateX(-50%)' }}>
        <ul style={{ margin: '0px' }}>{dots}</ul>
      </div>
    ),
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      const token = Cookies.get("access_token");
      const apiUrl = `/api/menu/products/${productName}/`;
      try {
        const res = await axios.get(apiUrl, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }); 
        setProduct(res.data);
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
          {
            product.product_file && product.product_file.length > 0 ? (
              <Slider {...settings}>
                {product.product_file.map((file, index) => (
                  <div key={index}>
                    {file.product_photo && (
                      <img
                        src={file.product_photo}
                        alt={`Product Photo ${index + 1}`}
                        className="w-full h-64 object-cover rounded-lg"
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
              </Slider>
            ) : (
              <img
                src="https://res.cloudinary.com/dodrvhrz7/image/upload/v1735037850/default_gseslf.jpg"
                alt="Default Product"
                className="w-full h-64 object-cover rounded-lg"
              />
            )
          }

          <div>
            <h3 className="text-2xl font-bold mb-4">Details</h3>
            <p className="mb-2">
              <strong>Description:</strong> {product.description}
            </p>
            <div className="grid grid-cols-3">
            <p className="m-2 bg-white rounded-l shadow-md p-2">
              <strong>Teacher:</strong> {product.teacher}
            </p>
            <p className="m-2 bg-white rounded-l shadow-md p-2">
              <strong>Price:</strong> ${product.price}
            </p>
            <p className="m-2 bg-white rounded-l shadow-md p-2">
              <strong>Category:</strong> {product.category.name}
            </p>
            {product.discount && (
              <p className="m-2 bg-white rounded-l shadow-md p-2">
                <strong>Discount:</strong> {product.discount.name}
              </p>
            )}
            <p className="m-2 bg-white rounded-l shadow-md p-2">
              <strong>Course Time:</strong> {product.course_time}
            </p>
            <p className="m-2 bg-white rounded-l shadow-md p-2">
              <strong>Prerequisite:</strong> {product.prerequisite}
            </p>
            </div>
            <hr />
            <div className="grid grid-cols-5 mt-2">
            <p className="mb-2 bg-indigo-500 text-white rounded-lg px-4 py-2 cursor-pointer"
            onClick={() => useCart.addToCart(product)}
            >
              Add to cart
            </p>
            </div>

            <h3 className="text-2xl font-bold mt-6 mb-4">Topics</h3>
            {product.product_topic_file.length > 0 ? (
              <div className="space-y-4">
                {product.product_topic_file.map((topic, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-md p-4"
                  >
                    <h4 className="text-lg font-bold">{topic.title}</h4>
                    <p className="text-gray-500">{topic.description}</p>
                    {topic.topic_photo && (
                      <img
                        className="w-full h-48 object-cover rounded-lg mt-4"
                        src={topic.topic_photo}
                        alt={topic.title}
                      />
                    )}

                    {topic.topic_media.map((media, mediaIndex) => (
                      <div key={mediaIndex} className="mt-4">
                        {media.topic_movie && (
                          <video
                            className="w-full h-48 object-cover rounded-lg"
                            controls
                            src={media.topic_movie}
                          >
                            Your browser does not support the video tag.
                          </video>
                        )}
                      </div>
                    ))}

                    
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
