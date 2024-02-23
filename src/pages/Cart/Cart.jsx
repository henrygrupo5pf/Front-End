import React, { useEffect } from 'react'; // Asegúrate de importar useEffect
import { useCartStore } from "../../Store/CartStore";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useUserStore } from '../../Store/UserStore';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { userAuth } = useUserStore();
  const { cartItems, removeFromCart, clearCart, error, clearError } = useCartStore(state => ({
    cartItems: state.cartItems,
    removeFromCart: state.removeFromCart,
    clearCart: state.clearCart,
    error: state.error,
    clearError: state.clearError,
  }));
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      alert(error);
      clearError();
    }
  }, [error, clearError]);

  const handleGoHome = () => {
    navigate('/');
  };

  const handleCheckOut = () => {
    if (!userAuth) {
      alert("Por favor, inicia sesión para continuar con la compra.");
      navigate("/login");
      return;
    }
    navigate("/checkOut");
  };

  const calculateDays = (startDate, endDate) => {
    const oneDay = 24 * 60 * 60 * 1000; // milisegundos en un día
    const diffDays = Math.round(Math.abs((new Date(endDate).getTime() - new Date(startDate).getTime()) / oneDay));
    return diffDays + 1; // +1 para incluir ambos días en el conteo
  };

  const total = cartItems.reduce((acc, item) => {
    const startDate = new Date(item.startDate);
    const endDate = new Date(item.endDate);
    const diffDays = calculateDays(startDate, endDate);
    return acc + (Number(item.cost) * diffDays);
  }, 0);

  const isLogged = () => {
    console.log(cartItems.length);
    if (userAuth) {
      if(cartItems.length!=0){

        return (
          <Button onClick={handleCheckOut}>Continuar con la compra</Button>
        )
      }
      return null
    }

    return (
      <LoginContainer>

        <Link to='/login'>
          <ButtonLogin type="submit"> Iniciar Sesion </ButtonLogin>
        </Link>
        <h5>Debes iniciar sesion primero</h5>
      </LoginContainer>
    )
  }

  return (
    <Container>
      <SubContainer>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <React.Fragment key={item.id}>
              <CardContainer>
                <Options>
                  <ButtonOption onClick={() => removeFromCart(item.id)}>Eliminar producto</ButtonOption>
                </Options>
                <MiniCard>
                  <ProductInfo>
                    <h5>{item.name}</h5>
                    <img className={"img"} src={item.photo} alt={item.name} />
                    <h2>${Number(item.cost).toFixed(2)}/ Día</h2>
                  </ProductInfo>

                  <ReservationInfo>
                    <h4>Inicio: {new Date(item.startDate).toLocaleDateString()}</h4>
                    <h4>Entrega: {new Date(item.endDate).toLocaleDateString()}</h4>
                    <h4>Días reservados: {calculateDays(new Date(item.startDate), new Date(item.endDate))}</h4>
                    <h4>Subtotal: ${(Number(item.cost) * calculateDays(new Date(item.startDate), new Date(item.endDate))).toFixed(2)}</h4>
                  </ReservationInfo>
                </MiniCard>
              </CardContainer>
            </React.Fragment>
          ))
        ) : (
          <h1>No hay productos en el carrito.</h1>
        )}
        <FinalContainer>
          <Button onClick={clearCart}>Limpiar carrito</Button>
          <Button onClick={handleGoHome}>Regresar a comprar</Button>
          {userAuth ? (
            <Button onClick={handleCheckOut}>Continuar con la compra</Button>
          ) : (
            <LoginContainer>
              <Link to='/login'>
                <ButtonLogin type="submit">Iniciar Sesión</ButtonLogin>
              </Link>
              <h5>Debes iniciar sesión primero</h5>
            </LoginContainer>
          )}
        </FinalContainer>
        <h2>Total: ${total.toFixed(2)}</h2>
      </SubContainer>
    </Container>
  );
};

export default Cart;

// Aquí deberías definir o importar tus componentes estilizados como Container, SubContainer, CardContainer, etc.




const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  `
  const SubContainer = styled.div`
  width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 20px;
  box-shadow: 5px 10px 17px black;
  border-radius: 10px;
  margin: auto;
  overflow-x: auto;

  `

const MiniCard = styled.div`
  width: 600px; /* Mantén el ancho o ajústalo según sea necesario */
  min-height: 100px; /* Usa min-height en lugar de height para permitir que crezca */
  padding: 10px; /* Añade padding para no pegar el contenido a los bordes */
  display: flex;
  align-items: center;
  justify-content: flex-start; /* Cambiado de center a flex-start para alinear el contenido al principio */
  background-color: white;
  border-radius: 5px;
  box-shadow: 5px 10px 17px black;
  overflow-x: auto; /* Cambiado de hidden a auto para permitir desplazamiento si es necesario */
  white-space: nowrap; 
`;

const ProductInfo = styled.div`
width: 320px;
height: inherit;
display: flex;
flex-direction: column;
align-items: center;
justify-content: flex-start; /* Cambiado de center a flex-start para alinear el contenido al principio */
overflow: auto; /* Cambiado de hidden a auto para permitir desplazamiento si es necesario */
.img{
  width: 70px;
  height: auto; /* Asegura que la imagen mantenga su proporción */
  margin-bottom: 10px; /* Añade un margen debajo de la imagen */
}
`

const ReservationInfo = styled.div`
  width: 260px;
  height: inherit;
  display: flex;
  flex-direction: column;
  padding-left: 50px;
 

`

const CardContainer = styled.div`
display: flex;
align-items: center;
justify-content: space-around;
width: 70%;
margin: 20px;


`
const Options = styled.div`
text-align: center;
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
margin: 30px;
/* Estilo para cuando el elemento está siendo presionado */
&:active {
  background-color: #dbdbdb; /* Este color se aplica cuando se hace clic */
}
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
 
`

const ButtonLogin = styled.button`
background-color: #4caf50; 
color: white;
padding: 10px 15px;
border: none;
border-radius: 4px;
cursor: pointer;
font-size: 21px;
margin: 30px 30px 5px 30px;
/* Estilo para cuando el elemento está siendo presionado */
&:active {
  background-color: #dbdbdb; /* Este color se aplica cuando se hace clic */
}

h5{
  margin: 10px;
}
 
`;

const FinalContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  
  `


