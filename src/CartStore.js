// CartStore.js
import {create} from 'zustand';

export const useCartStore = create((set) => ({
  cartItems: [], // Aquí almacenarás los artículos agregados al carrito

  // Añade un producto al carrito
  addToCart: (product) => set((state) => {
    // Verificar si el producto ya está en el carrito
    const productExists = state.cartItems.some((item) => item.id === product.id);
    if (productExists) {
      // Si ya está, incrementar la cantidad
      return {
        cartItems: state.cartItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };
    } else {
      // Si no está, agregar el producto al carrito
      return {
        cartItems: [...state.cartItems, { ...product, quantity: 1 }],
      };
    }
  }),

  // Remueve un producto del carrito
  removeFromCart: (productId) => set((state) => ({
    cartItems: state.cartItems.filter((item) => item.id !== productId),
  })),

  // Incrementa la cantidad de un producto específico en el carrito
  incrementQuantity: (productId) => set((state) => ({
    cartItems: state.cartItems.map((item) =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    ),
  })),

  // Decrementa la cantidad de un producto específico en el carrito
  decrementQuantity: (productId) => set((state) => ({
    cartItems: state.cartItems.map((item) =>
      item.id === productId ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
    ),
  })),

  // Limpia todos los productos del carrito
  clearCart: () => set(() => ({
    cartItems: [],
  })),
}));



