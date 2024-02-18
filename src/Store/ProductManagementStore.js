import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useProductManagementStore = create(persist(
  (set) => ({
    products: [],

    // Método para actualizar la lista de productos
    setProducts: (products) => set({ products }),

    // Método para agregar un producto a la lista
    addProduct: (product) => set((state) => ({
      products: [...state.products, product],
    })),

    // Método para eliminar un producto de la lista
    removeProduct: (productId) => set((state) => ({
      products: state.products.filter((product) => product.id !== productId),
    })),

    // Método para cambiar el estado activo de un producto
    toggleProductStatus: (productId) => set((state) => ({
      products: state.products.map((product) =>
        product.id === productId ? { ...product, activeStatus: !product.activeStatus } : product
      ),
    })),

    // Método para vaciar la lista de productos
    clearProducts: () => set(() => ({
      products: [],
    })),
  }),
  {
    name: 'product-management-storage', // Nombre del ítem en el localStorage
    storage: localStorage, // Utiliza la opción `storage` en lugar de `getStorage`
  }
));
