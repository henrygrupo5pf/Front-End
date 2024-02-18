import { useEffect } from 'react';
import { useProductManagementStore } from '../../Store/ProductManagementStore';

const BASE_URL = "https://pf-server-93lj.onrender.com";
const TEST_URL = "http://localhost:3001";

const ProductManagement = () => {
  const { products, toggleProductStatus } = useProductManagementStore(); 

  useEffect(() => {
    // Aquí podrías realizar cualquier carga inicial de datos, si es necesario
  }, []);

  const handleToggleProductStatus = async (productId) => {
    try {
      const response = await fetch(`${TEST_URL}/product/${productId}/toggle`, {
        method: 'PUT',
      });
      if (!response.ok) {
        throw new Error('Error al cambiar el estado del producto');
      }
      toggleProductStatus(productId); // Usa toggleProductStatus del store para actualizar el estado localmente
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Product Management</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - 
            <button onClick={() => handleToggleProductStatus(product.id)}>
              {product.activeStatus ? 'Desactivar' : 'Activar'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductManagement;
