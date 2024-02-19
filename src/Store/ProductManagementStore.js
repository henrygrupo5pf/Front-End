import create from 'zustand';
import { persist } from 'zustand/middleware';

const BASE_URL = "https://pf-server-93lj.onrender.com";
const TEST_URL = "http://localhost:3001";

export const useProductManagementStore = create(persist(
  (set) => ({
    products: [],
    loading: false,
    error: null,
    loadProducts,
    loadUserProducts,
    loadTestProducts,
  }),
  {
    name: "product-management-store", // Nombre de la clave en localStorage
    getStorage: () => localStorage, // Función para obtener el almacenamiento
  }
));

// Método para cargar productos desde la API
function loadProducts() {
  return async (set) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${BASE_URL}/products`);
      if (!response.ok) {
        throw new Error('Error al cargar los productos');
      }
      const products = await response.json();
      set({ products, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  };
}

// Método para cargar productos de un usuario desde la API
function loadUserProducts(userId) {
  return async (set) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${BASE_URL}/products?userId=${userId}`);
      if (!response.ok) {
        throw new Error('Error al cargar los productos del usuario');
      }
      const products = await response.json();
      set({ products, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  };
}

// Método para cargar productos desde la API de prueba
function loadTestProducts() {
  return async (set) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${TEST_URL}/products`);
      if (!response.ok) {
        throw new Error('Error al cargar los productos de prueba');
      }
      const products = await response.json();
      set({ products, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  };
}
