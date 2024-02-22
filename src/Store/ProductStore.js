// // store/productsStore.js
// import {create} from 'zustand';

// const useProductsStore = create((set) => ({
//   products: [],
//   setProducts: (products) => set(() => ({ products })),
//   toggleProductActiveStatus: (productId, newActiveStatus) => set((state) => ({
//     products: state.products.map(product =>
//       product.id === productId ? { ...product, isActive: newActiveStatus } : product
//     ),
//   })),
  
// }));

// export default useProductsStore;
// store/productsStore.js
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

