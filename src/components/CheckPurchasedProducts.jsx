import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const CheckPurchasedProducts = ({ cart, setCart, setTotalPrice }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkProducts = async () => {
      try {
        const token = Cookies.get("access_token");
        const res = await axios.post('/api/order/check-purchased-products/', { products: cart }, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.removedProducts.length > 0) {
             
          setCart(res.data.remainingProducts);

        const calculatedTotal = res.data.remainingProducts.reduce(
            (total, item) => total + item.price * item.quantity,
            0
          );
          setTotalPrice(calculatedTotal);

          Cookies.set('cart', JSON.stringify(res.data.remainingProducts), { path: '/' });
          alert('Some products have already been purchased and removed from your cart.');
          window.dispatchEvent(new Event('cartChange'));
        }
      } catch (error) {
        console.error('Error checking purchased products:', error);
      } finally {
        setLoading(false);
      }
    };

    checkProducts();
  }, [cart, setCart]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return null; // No need to render anything once the check is complete
};

export default CheckPurchasedProducts;
