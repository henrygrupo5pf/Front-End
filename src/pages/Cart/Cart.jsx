import React from 'react';
import { useCartStore } from "../../Store/CartStore";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useCartStore();
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  const handleCheckOut = () => {
    navigate("/checkOut");
  };

  // Función auxiliar para calcular la cantidad de días entre dos fechas
  const calculateDays = (startDate, endDate) => {
    const oneDay = 24 * 60 * 60 * 1000; // milisegundos en un día
    const diffDays = Math.round(Math.abs((endDate - startDate) / oneDay));
    return diffDays + 1; // +1 para incluir ambos días en el conteo
  };

  // Calcula el total basado en el costo por día y el número de días reservados para cada producto
  const total = cartItems.reduce((acc, item) => {
    const startDate = new Date(item.startDate);
    const endDate = new Date(item.endDate);
    const diffDays = calculateDays(startDate, endDate);
    return acc + (Number(item.cost) * diffDays);
  }, 0);

  return (
    <Container>
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <CardContainer key={item.id}>
            <Options>
              <ButtonOption onClick={() => removeFromCart(item.id)}>Eliminar producto</ButtonOption>
            </Options>
            <MiniCard>
              <h5>{item.name}</h5>
              <img className={"img"} src={item.photo} alt={item.name} />
              
              <div>
                <h3>Fecha de inicio: {new Date(item.startDate).toLocaleDateString()}</h3>
                <h3>Fecha de entrega: {new Date(item.endDate).toLocaleDateString()}</h3>
                <h3>Días reservados: {calculateDays(new Date(item.startDate), new Date(item.endDate))}</h3>
                <h3>Costo por día: ${Number(item.cost).toFixed(2)}</h3>
                <h3>Subtotal: ${(Number(item.cost) * calculateDays(new Date(item.startDate), new Date(item.endDate))).toFixed(2)}</h3>
              </div>
            </MiniCard>
          </CardContainer>
        ))
      ) : (
        <p>No hay productos en el carrito.</p>
      )}
      <h1>Total a Pagar: ${total.toFixed(2)}</h1>
      <FinalContainer>
        <Button onClick={clearCart}>Limpiar carrito</Button>
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
  width: 220px; /* Mantén el ancho o ajústalo según sea necesario */
  min-height: 100px; /* Usa min-height en lugar de height para permitir que crezca */
  padding: 10px; /* Añade padding para no pegar el contenido a los bordes */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* Cambiado de center a flex-start para alinear el contenido al principio */
  background-color: white;
  border-radius: 5px;
  box-shadow: 5px 10px 17px black;
  overflow: auto; /* Cambiado de hidden a auto para permitir desplazamiento si es necesario */
  .img{
    width: 70px;
    height: auto; /* Asegura que la imagen mantenga su proporción */
    margin-bottom: 10px; /* Añade un margen debajo de la imagen */
  }
`;


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