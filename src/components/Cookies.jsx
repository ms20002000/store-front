import Cookies from 'js-cookie';
import { toast } from "react-toastify";


export const useCart = {
  addToCart: (product) => {
    const existingCart = Cookies.get('cart');
    let cart = existingCart ? JSON.parse(existingCart) : [];
    
    const existingProduct = cart.find(item => item.id === product.id);
    
    if (existingProduct) {
      // cart = cart.map(item => 
      //   item.id === product.id 
      //     ? { ...item, quantity: item.quantity + 1 }
      //     : item
    // );
    toast.error('Your product already exist')
    return
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    toast.success("Your product successfully added");
    Cookies.set('cart', JSON.stringify(cart));
  },

  getCart: () => {
    const cart = Cookies.get('cart');
    return cart ? JSON.parse(cart) : [];
  }
};