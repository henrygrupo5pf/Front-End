// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';

// export const useCartStore = create(persist(
//   (set) => ({
//     cartItems: [], // Estado inicial del carrito
//     total: 0,
//     error: null, // Estado de error para manejar errores en la UI
//     successMessage: null, // Nuevo estado para manejar mensajes de éxito

//     // Método para actualizar el total del carrito
//     updateTotal: () => set((state) => ({
//       total: state.cartItems.reduce((acc, item) => acc + item.cost * item.quantity, 0)
//     })),

//     // Método modificado para añadir productos al carrito incluyendo fechas de reserva
//     addToCart: (product, startDate, endDate) => set((state) => {
//       const cost = Number(product.cost);
//       if (isNaN(cost) || cost <= 0) {
//         return {
//           ...state,
//           cartItems: [...state.cartItems, { ...product, cost, quantity: 1, startDate, endDate }],
//           successMessage: 'Producto añadido al carrito correctamente.', // Establecer el mensaje de éxito
//           error: null,
//         };
//       }

//       const start = new Date(startDate);
//       const end = new Date(endDate);
//       const now = new Date(); // Obtener la fecha actual y normalizarla
//       now.setHours(0, 0, 0, 0); 

//       if (start < now || end < start) {
//         return { ...state, error: 'Las fechas seleccionadas no son válidas. Asegúrate de que la fecha de inicio no sea anterior a hoy y que la fecha de fin no sea anterior a la fecha de inicio.' };
//       }

//       const productExists = state.cartItems.some((item) => item.id === product.id);
//       if (productExists) {
//         return {
//           ...state,
//           cartItems: state.cartItems.map((item) =>
//             item.id === product.id ? { ...item, quantity: item.quantity + 1, startDate, endDate } : item
//           ),
//           successMessage: 'Cantidad del producto actualizada correctamente.', // Nuevo mensaje de éxito
//           error: null,
//         };
//       } else {
//         return {
//           ...state,
//           cartItems: [...state.cartItems, { ...product, cost, quantity: 1, startDate, endDate }],
//           successMessage: 'Producto añadido al carrito correctamente.', // Nuevo mensaje de éxito
//           error: null,
//         };
//       }
//     }),

//     // Método para remover productos del carrito
//     removeFromCart: (productId) => set((state) => ({
//       cartItems: state.cartItems.filter((item) => item.id !== productId),
//       successMessage: 'Producto eliminado del carrito.', // Nuevo mensaje de éxito al eliminar
//     })),

//     // Métodos para limpiar el estado de error y éxito
//     clearError: () => set(() => ({ error: null })),
//     clearSuccessMessage: () => set(() => ({ successMessage: null })),
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
    error: null, // Estado de error para manejar errores en la UI
    successMessage: null, // Nuevo estado para manejar mensajes de éxito

    // Método para actualizar el total del carrito
    updateTotal: () => set((state) => ({
      total: state.cartItems.reduce((acc, item) => acc + item.cost * item.quantity, 0)
    })),

    // Método modificado para añadir productos al carrito incluyendo fechas de reserva
    addToCart: (product, startDate, endDate) => set((state) => {
      const cost = Number(product.cost);
      if (isNaN(cost) || cost <= 0) {
        return { ...state, error: 'El costo del producto no es válido.' }; // Actualizado para manejar el error de costo inválido
      }

      const start = new Date(startDate);
      const end = new Date(endDate);
      const now = new Date();
      now.setHours(0, 0, 0, 0);

      if (start < now || end < start) {
        return { ...state, error: 'Las fechas seleccionadas no son válidas. Asegúrate de que la fecha de inicio no sea anterior a hoy y que la fecha de fin no sea anterior a la fecha de inicio.' };
      }

      const productExists = state.cartItems.some((item) => item.id === product.id);
      if (productExists) {
        // Actualiza la cantidad del producto existente y las fechas sin cambiar el mensaje de éxito
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1, startDate, endDate } : item
          ),
          error: null, // Asegura que el error esté limpio si la operación es exitosa
        };
      } else {
        // Añade el nuevo producto al carrito y establece el mensaje de éxito
        return {
          ...state,
          cartItems: [...state.cartItems, { ...product, cost, quantity: 1, startDate, endDate }],
          successMessage: 'Producto añadido al carrito correctamente.',
          error: null,
        };
      }
    }),

    // Método para remover productos del carrito
    removeFromCart: (productId) => set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== productId),
      successMessage: 'Producto eliminado del carrito.', // Actualiza el mensaje de éxito al eliminar
      error: null, // Limpia cualquier error existente
    })),

    // Métodos para limpiar el estado de error y éxito
    clearError: () => set(() => ({ error: null })),
    clearSuccessMessage: () => set(() => ({ successMessage: null })),
  }),
  {
    name: 'cart-storage', // Nombre del ítem en el localStorage
    getStorage: () => localStorage, // Especifica el almacenamiento a usar
  }
));
