import React, { useEffect } from 'react';
import { useProductManagementStore } from "../../Store/ProductManagementStore";

function ProductManagement() {
  const { userId, products, loading, error, loadUserProducts } = useProductManagementStore();
 
  useEffect(() => {
    if (userId) {
      loadUserProducts(userId);
    }
  }, [userId, loadUserProducts]);

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
