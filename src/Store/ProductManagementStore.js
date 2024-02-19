import create from 'zustand';
import { persist } from 'zustand/middleware';
import { useQuery } from "@tanstack/react-query";

const fetchProductByUserId = ({ queryKey, setError }) => {
  const [userId, queryType] = queryKey;
  const url = queryType === "ALL"
    ? `http://localhost:3001/products`
    : `http://localhost:3001/products?userId=${userId}`;

  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Something went wrong. Try again. Error code: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (Array.isArray(data) && data.length === 0) {
        setError("No products found. Please try searching with different parameters");
      }
      return data;
    })
    .catch((error) => {
      setError("You have entered a wrong parameter. Remember that ID must be a number ");
      return 0;
    });
};

const onSubmit = (event, setUserId, setQueryType, setError, setSearchUserId, searchUserId, searchType) => {
  event.preventDefault();
  setUserId(searchUserId);
  setQueryType(searchType);
  setError(null);
  loadUserProducts(searchUserId);
};

const onChange = (event, setSearchUserId) => {
  setSearchUserId(event.target.value); 
};

export const useProductManagementStore = create(persist(
  (set) => ({
    userId: null,
    products: [],
    loading: false,
    error: null,
    loadProducts,
    loadUserProducts,
    loadTestProducts,
    onSubmit,
    onChange,
  }),
  {
    name: "product-management-store", 
    getStorage: () => localStorage,
  }
));

function useProductQuery(userId, queryType) {
  const query = useQuery({
    queryKey: [userId, queryType],
    queryFn: fetchProductByUserId,
  });

  return query;
}

// Método para cargar productos desde la API
function loadProducts() {
  return async (set, BASE_URL) => {
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
function loadUserProducts() {
  return async (set, userId) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`http://localhost:3001/products?userId=${userId}`);
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  };
}

// Método para cargar productos desde la API de prueba
function loadTestProducts() {
  return async (set, TEST_URL) => {
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
