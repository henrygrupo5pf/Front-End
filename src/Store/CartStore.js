// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';

// export const useCartStore = create(persist(
//   (set) => ({
//     cartItems: [], // Estado inicial del carrito
//     total: 0,
//     startDate: null, // Estado para la fecha de inicio de la reserva
//     endDate: null, // Estado para la fecha de fin de la reserva

//     // Método para actualizar el total del carrito
//     updateTotal: () => set((state) => ({
//       total: state.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
//     })),

//     // Método para añadir productos al carrito
//     addToCart: (product) => set((state) => {
//       console.log('Producto antes de añadir al carrito:', product);

//       const cost = Number(product.cost);
//       if (isNaN(cost) || cost <= 0) {
//         console.error('Intento de agregar producto sin costo válido:', product);
//         return state; // No agregar el producto si no tiene un costo válido
//       }

//       const productExists = state.cartItems.some((item) => item.id === product.id);
//       if (productExists) {
//         return {
//           cartItems: state.cartItems.map((item) =>
//             item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
//           ),
//         };
//       } else {
//         return {
//           cartItems: [...state.cartItems, { ...product, cost: cost, quantity: 1 }],
//         };
//       }
//     }),

//     // Método para remover productos del carrito
//     removeFromCart: (productId) => set((state) => ({
//       cartItems: state.cartItems.filter((item) => item.id !== productId),
//     })),

//     // Método para incrementar la cantidad de un producto en el carrito
//     incrementQuantity: (productId) => set((state) => {
//       console.log('Producto antes de incrementar cantidad:', state.cartItems.find(item => item.id === productId));
//       return {
//         cartItems: state.cartItems.map((item) =>
//           item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
//         ),
//       };
//     }),

//     // Método para decrementar la cantidad de un producto en el carrito
//     decrementQuantity: (productId) => set((state) => ({
//       cartItems: state.cartItems.map((item) =>
//         item.id === productId ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
//       ),
//     })),

//     // Método para vaciar el carrito
//     clearCart: () => set(() => ({
//       cartItems: [],
//     })),

//     // Método para establecer la fecha de inicio de la reserva
//     setStartDate: (date) => set(() => ({ startDate: date })),

//     // Método para establecer la fecha de fin de la reserva
//     setEndDate: (date) => set(() => ({ endDate: date })),

//     // Función para calcular la cantidad de días entre dos fechas
//     calculateDays: (fechaInicio, fechaFin) => {
//       if (!fechaInicio || !fechaFin) return 0;
//       const oneDay = 24 * 60 * 60 * 1000; // Milisegundos en un día
//       return Math.ceil((fechaFin - fechaInicio) / oneDay);
//     }
//   }),
//   {
//     name: 'cart-storage', // Nombre del ítem en el localStorage
//     getStorage: () => localStorage, // Especifica el almacenamiento a usar
//   }
// ));
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(persist(
  (set) => ({
    cartItems: [], // Estado inicial del carrito
    total: 0,

    // Método para actualizar el total del carrito
    updateTotal: () => set((state) => ({
      total: state.cartItems.reduce((acc, item) => acc + item.cost * item.quantity, 0)
    })),

    // Método modificado para añadir productos al carrito incluyendo fechas de reserva
    addToCart: (product, startDate, endDate) => set((state) => {
      console.log('Producto antes de añadir al carrito:', product);

      const cost = Number(product.cost);
      if (isNaN(cost) || cost <= 0) {
        console.error('Intento de agregar producto sin costo válido:', product);
        return state; // No agregar el producto si no tiene un costo válido
      }

      const productExists = state.cartItems.some((item) => item.id === product.id);
      if (productExists) {
        return {
          cartItems: state.cartItems.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1, startDate, endDate } : item
          ),
        };
      } else {
        return {
          cartItems: [...state.cartItems, { ...product, cost, quantity: 1, startDate, endDate }],
        };
      }
    }),

    // Método para remover productos del carrito
    removeFromCart: (productId) => set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== productId),
    })),

    // Método para incrementar la cantidad de un producto en el carrito
    incrementQuantity: (productId) => set((state) => {
      return {
        cartItems: state.cartItems.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };
    }),

    // Método para decrementar la cantidad de un producto en el carrito
    decrementQuantity: (productId) => set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.id === productId ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
      ),
    })),

    // Método para vaciar el carrito
    clearCart: () => set(() => ({
      cartItems: [],
    })),

    // Función para calcular la cantidad de días entre dos fechas
    calculateDays: (startDate, endDate) => {
      if (!startDate || !endDate) return 0;
      const oneDay = 24 * 60 * 60 * 1000; // Milisegundos en un día
      return Math.ceil((new Date(endDate) - new Date(startDate)) / oneDay);
    }
  }),
  {
    name: 'cart-storage', // Nombre del ítem en el localStorage
    getStorage: () => localStorage, // Especifica el almacenamiento a usar
  }
));
