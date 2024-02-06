import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(persist(
  (set) => ({
    cartItems: [], // Estado inicial del carrito

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

    removeFromCart: (productId) => set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== productId),
    })),

    incrementQuantity: (productId) => set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      ),
    })),

    decrementQuantity: (productId) => set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.id === productId ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
      ),
    })),

    clearCart: () => set(() => ({
      cartItems: [],
    })),
  }),
  {
    name: 'cart-storage', // nombre del ítem en el localStorage
    getStorage: () => localStorage, // especifica el almacenamiento a usar
  }
));
