import React, { useState, useEffect } from "react";
import { useCart } from "../components/Cookies";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import useAuthRedirect from "../components/UseAuthRedirect";
import { toast } from "react-toastify";
import Cookies from 'js-cookie';


const CheckoutPage = () => {
  useAuthRedirect();
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discountCode, setDiscountCode] = useState("");
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchedCart = useCart.getCart();
    setCart(fetchedCart);

    const calculatedTotal = fetchedCart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    setTotalPrice(calculatedTotal);
  }, []);

  const handleApplyDiscount = () => {
    if (isDiscountApplied) {
      toast.error("Discount code already applied.");
      return;
    }

    if (discountCode === "DISCOUNT10") {
      const discountedPrice = (totalPrice * 0.9).toFixed(2);
      setTotalPrice(discountedPrice);
      setIsDiscountApplied(true);
      toast.success("Discount applied successfully!");
    } else {
      toast.error("Invalid discount code.");
    }
  };

  const handleCheckout = async () => {
    setLoading(true);
    const token = Cookies.get('access_token');

    try {
      const response = await axios.post(
        "/api/order/create_order/",
        {
          cart,
          total_price: totalPrice,
          discount_code: discountCode,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );

      if (response.status === 201) {
        toast.success("Payment successful!");
        Cookies.set('cart', '')
        navigate("/customerDashboard/"); 
      } else {
        toast.error("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("An error occurred during checkout. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-50 px-4 py-10">
      <div className="container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          Checkout
        </h2>
        {cart.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          <div>
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
                        product.product_file[0]?.product_photo ||
                        "https://via.placeholder.com/150"
                      }
                      alt={product.name}
                    />
                  </div>
                  <div className="col-span-2">
                    <h3 className="text-xl font-bold">{product.name}</h3>
                    <p className="text-gray-500">
                      Price: ${product.price} | Quantity: {product.quantity}
                    </p>
                    <p className="text-gray-500">Description: {product.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 bg-indigo-100 p-4 rounded-lg">
              <h3 className="text-xl font-bold">Total Price: ${totalPrice}</h3>
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Enter discount code"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  className="border rounded-lg px-4 py-2 w-2/3 md:w-1/3"
                />
                <button
                  onClick={handleApplyDiscount}
                  className="ml-4 bg-indigo-500 text-white rounded-lg px-6 py-2 hover:bg-indigo-600"
                >
                  Apply Discount
                </button>
              </div>
              <button
                onClick={handleCheckout}
                disabled={loading}
                className={`mt-4 ${
                  loading ? "bg-gray-400" : "bg-green-500"
                } text-white rounded-lg px-6 py-2 hover:bg-green-600`}
              >
                {loading ? "Processing..." : "Confirm and Pay"}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CheckoutPage;
