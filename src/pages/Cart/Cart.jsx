import React from 'react';
import { useCartStore } from "../../Store/CartStore"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"

const Cart = () => {
  const { cartItems, addToCart, removeFromCart, incrementQuantity, decrementQuantity, clearCart } = useCartStore();
  const total = cartItems.reduce((acc, item) => acc + (Number(item.cost) || 0) * item.quantity, 0);

  const navigate = useNavigate();
  const handleGoHome = () => {
    navigate('/'); // Navegar a la página de inicio

  };

  //Por aca se esta yendo a la pasarela de pago
  const handleCheckOut = () => {
   
    navigate("/checkOut");
  };

  return (
    <Container>
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <CardContainer key={item.id}>
            
            <Options>
                <ButtonOption onClick={() => incrementQuantity(item.id)}>+</ButtonOption>
                <ButtonOption onClick={() => decrementQuantity(item.id)}>-</ButtonOption>
                <ButtonOption onClick={() => removeFromCart(item.id)}>Remove</ButtonOption>
            </Options>

            <MiniCard>
              <h5>{item.name}</h5>
              <img className={"img"} src={item.photo} alt="" />
            </MiniCard>
              
            
              
            <h3> Días reservados: {item.quantity}</h3>
            
            <h3> - ${Number(item.cost).toFixed(2)} cada uno</h3>
            
          </CardContainer>
        ))
      ) : (
        <p>No hay productos en el carrito.</p>
      )}
      {/* El total se muestra aquí, una sola vez, fuera del .map() */}
      <h1>Total a Pagar: ${total.toFixed(2)}</h1>
      <FinalContainer>
        
        <Button onClick={clearCart}>Clear Cart</Button>
        <Button onClick={handleGoHome}>Regresar a comprar</Button>
        <Button onClick={handleCheckOut}>Continuar con la compra</Button>
      </FinalContainer>
      
    </Container>
  );

};

export default Cart;


const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  `

const MiniCard = styled.div`
  width: 220px;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 5px;
  box-shadow: 5px 10px 17px black;
  overflow: hidden;
  .img{
    width: 70px
  }
  `

const CardContainer = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
width: 800px;
margin: 20px;
`
const Options = styled.div`
display: flex;
align-items: center;
justify-content: center;
&:hover {
  background-color: #ececec; /* Este color se aplica con el hover */
}

/* Estilo para cuando el elemento está siendo presionado */
&:active {
  background-color: #dbdbdb; /* Este color se aplica cuando se hace clic */
}
`

const ButtonOption = styled.button`
background-color: #4caf50;
color: white;
padding: 4px 7px;
border: none;
border-radius: 4px;
cursor: pointer;
font-size: 18px;
margin: 2px;


/* Estilo para cuando el elemento está siendo presionado */
&:active {
  background-color: #dbdbdb; /* Este color se aplica cuando se hace clic */
}
`;

const Button = styled.button`
background-color: #4caf50;
color: white;
padding: 10px 15px;
border: none;
border-radius: 4px;
cursor: pointer;
font-size: 21px;
margin: 2px;
/* Estilo para cuando el elemento está siendo presionado */
&:active {
  background-color: #dbdbdb; /* Este color se aplica cuando se hace clic */
}
`;

const FinalContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  `