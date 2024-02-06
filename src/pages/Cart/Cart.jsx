import React from 'react';
import {useCartStore} from "../../Store/CartStore"
import { useNavigate } from "react-router-dom"

const Cart = () => {
  const { cartItems, addToCart, removeFromCart, incrementQuantity, decrementQuantity, clearCart } = useCartStore();
  const navigate = useNavigate();
  const handleGoHome = ()=>{
    navigate('/'); // Navegar a la página de inicio

  };

    //Por aca se esta yendo a la pasarela de pago
  const handleCheckOut = ()=>{
    navigate("/checkOut");
  };


  return (
    <div>
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <div key={item.id}>
            <span>{item.name}</span>
            <span>{item.quantity}</span>
            <button onClick={() => incrementQuantity(item.id)}>+</button>
            <button onClick={() => decrementQuantity(item.id)}>-</button>
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
            <button onClick={handleGoHome}>Regresar a comprar</button>
            <button onClick={handleCheckOut}>Continuar con la compra</button>
          </div>
        ))
      ) : (
        <p>No hay productos en el carrito.</p>
      )}
      <button onClick={clearCart}>Clear Cart</button>
    </div>
  );
  
};

export default Cart;
