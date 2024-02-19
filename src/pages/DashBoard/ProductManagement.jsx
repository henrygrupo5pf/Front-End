import React, { useEffect } from 'react';
import { useProductManagementStore } from "../../Store/ProductManagementStore";
import { useLocation } from 'react-router-dom';

function ProductManagement() {
  const { products, loading, error, loadUserProducts } = useProductManagementStore();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedUserId = queryParams.get('userId');

  useEffect(() => {
    if (selectedUserId) {
      loadUserProducts(selectedUserId);
    }
  }, [selectedUserId, loadUserProducts]);

  const toggleProductStatus = async (productId) => {
    try {
      // Llamar al backend para cambiar el estado del producto
      const response = await fetch(`/api/products/${productId}/toggle-status`, { method: 'PATCH' });
      if (!response.ok) {
        throw new Error('Error al cambiar el estado del producto');
      }
      // Recargar los productos después de cambiar el estado
      loadUserProducts(selectedUserId);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Product Management</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - Estado: {product.activeStatus ? 'Activo' : 'Inactivo'}
            <button onClick={() => toggleProductStatus(product.id)}>
              {product.activeStatus ? 'Desactivar' : 'Activar'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductManagement;
