import React, { useState, useEffect } from "react";
import { useCart } from "../components/Cookies";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';


const CartPage = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchedCart = useCart.getCart();
    setCart(fetchedCart);
  }, []);

  const handleRemoveItem = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
    // Update the cart in cookies
    Cookies.set("cart", JSON.stringify(updatedCart), { expires: 7});
    window.dispatchEvent(new Event('cartChange'));

  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  if (cart.length === 0) {
    return <p className="text-center text-gray-500">Your cart is empty.</p>;
  }

  return (
    <section className="bg-gray-50 px-4 py-10">
      <div className="container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          Shopping Cart
        </h2>
        <div className="space-y-6">
          {cart.map((product, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white shadow-md rounded-lg p-4"
            >
              <div>
                <img
                  className="w-full h-32 object-cover rounded-md"
                  src={
                    product.product_file && product.product_file.length > 0 && product.product_file[0].product_photo 
                    ? product.product_file[0].product_photo 
                    : "https://via.placeholder.com/150"
                  }
                  alt={product.name}
                />
              </div>
              <div className="col-span-2">
                <h3 className="text-xl font-bold">{product.name}</h3>
                <p className="text-gray-500">
                  Price: ${product.price} | Quantity: {product.quantity}
                </p>
                <p className="text-gray-500">{product.description}</p>
              </div>
              <div className="flex flex-col justify-between">
                <button
                  className="bg-red-500 text-white rounded-lg px-4 py-2 hover:bg-red-600"
                  onClick={() => handleRemoveItem(product.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 bg-indigo-100 p-4 rounded-lg">
          <h3 className="text-xl font-bold">Total: ${calculateTotalPrice()}</h3>
          <Link
            to="/checkout"
            className="inline-block mt-4 bg-indigo-500 text-white rounded-lg px-6 py-2 hover:bg-indigo-600"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
