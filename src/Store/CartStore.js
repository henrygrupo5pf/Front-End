import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(persist(
  (set) => ({
    cartItems: [], // Estado inicial del carrito
    total: 0,
    


    updateTotal: () => set((state) => ({
      total: state.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    })),
    

  
    addToCart: (product) => set((state) => {
      console.log('Producto antes de añadir al carrito:', product);

      const cost = Number(product.cost);
      if (isNaN(cost) || cost <= 0) {
        console.error('Intento de agregar producto sin costo válido:', product);
        return state; // No agregar el producto si no tiene un costo válido
      }
      
      const productExists = state.cartItems.some((item) => item.id === product.id);
      if (productExists) {
        // Si ya está, incrementar la cantidad
        return {
          cartItems: state.cartItems.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      } else {
        // Si no está, agregar el producto al carrito con el coste convertido a número
        return {
          cartItems: [...state.cartItems, { ...product, cost: cost, quantity: 1 }],
        };
      }
    }),
    

    removeFromCart: (productId) => set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== productId),
    })),

   
    incrementQuantity: (productId) => set((state) => {
      // Primero, ejecutamos el console.log
      console.log('Producto antes de incrementar cantidad:', state.cartItems.find(item => item.id === productId));
    
      // Luego, retornamos el nuevo estado
      return {
        cartItems: state.cartItems.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };
    }),
    

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
