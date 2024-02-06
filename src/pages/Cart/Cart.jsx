import React from 'react';
import {useCartStore} from "../../Store/CartStore"
import { useNavigate } from "react-router-dom"

const Cart = () => {
  const { cartItems, addToCart, removeFromCart, incrementQuantity, decrementQuantity, clearCart } = useCartStore();
  const total = cartItems.reduce((acc, item) => acc + (Number(item.cost) || 0) * item.quantity, 0);

  const navigate = useNavigate();
  const handleGoHome = ()=>{
    navigate('/'); // Navegar a la página de inicio

  };

    //Por aca se esta yendo a la pasarela de pago
  const handleCheckOut = ()=>{
    navigate("/checkOut");
  };


  console.log(cartItems)

  return (
    <div>
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <div key={item.id}>
            <span>{item.name}</span>
            <span> Días reservados: {item.quantity}</span>
            
            <span> - ${Number(item.cost).toFixed(2)} cada uno</span>
            <button onClick={() => incrementQuantity(item.id)}>+</button>
            <button onClick={() => decrementQuantity(item.id)}>-</button>
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </div>
        ))
      ) : (
        <p>No hay productos en el carrito.</p>
      )}
      {/* El total se muestra aquí, una sola vez, fuera del .map() */}
      <div>Total a Pagar: ${total.toFixed(2)}</div>
      <button onClick={clearCart}>Clear Cart</button>
      <button onClick={handleGoHome}>Regresar a comprar</button>
      <button onClick={handleCheckOut}>Continuar con la compra</button>
    </div>
  );
  
};

export default Cart;
