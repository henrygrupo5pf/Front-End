
import { create } from 'zustand';

export const useProductsStore = create((set) => ({
  products: [],
  setProducts: (products) => set(() => ({ products })),
  toggleProductActiveStatus: (productId, newActiveStatus) => set((state) => ({
    products: state.products.map(product =>
      product.id === productId ? { ...product, isActive: newActiveStatus } : product
    ),
  })),
}));

