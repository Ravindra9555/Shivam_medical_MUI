// /src/stores/useCartStore.js
import { create } from "zustand";

const useCartStore = create((set, get) => ({
  cart: [],
  addToCart: (product) =>
    set((state) => {
      const existingProduct = state.cart.find((item) => item._id === product._id);

      // If the product already exists in the cart, increase its quantity
      if (existingProduct) {
        return {
          cart: state.cart.map((item) =>
            item._id === product._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        // If the product is new, add it with a quantity of 1
        return {
          cart: [...state.cart, { ...product, quantity: 1 }],
        };
      }
    }),
  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item._id !== id),
    })),
  incrementQuantity: (id) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      ),
    })),
  decrementQuantity: (id) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item._id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ),
    })),

  clearCart: () => set({ cart: [] }),

  totalPrice: () =>{
    const cart = get().cart;
    return cart.reduce((total, item)=> total+item.price* item.quantity,0);

  },
  priceBeforeDiscount :()=>{
     const cart = get().cart;
    return cart.reduce((total, item)=> total+item.mrp * item.quantity,0);
  }
  
}));

export default useCartStore;
