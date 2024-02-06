import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import styled from 'styled-components';
import { useCartStore } from "../Store/CartStore";

const CheckOut = () => {
  const cartInfo = useCartStore((store) => store.cartItems)
  console.log(cartInfo);
/*   const BASE_URL = "https://pf-server-93lj.onrender.com"

  const handleSubmit = async () => {
    const requestBody = {
      cartItems: cartInfo,
    };
    const response = await fetch(`${BASE_URL}/checkOut`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (response.ok) {
      console.log('Solicitud POST exitosa');
    } else {
      console.error('Error en la solicitud POST:', response.statusText);
    }
  } */
    


  return (
    <FormContainer /* onSubmit={handleSubmit} */>
      Resumen de tu compra
      {cartInfo.map((item) => (
        <CardElementContainer key={item.id}>
          <StyledImage src={item.photo} alt={item.name} />
          <h3>{item.name}</h3>
          <p>Quantity: {item.quantity}</p>
        </CardElementContainer>
      ))}
      <SubmitButton>
        Continuar
      </SubmitButton>
    </FormContainer>

  );

};
export default CheckOut;

const FormContainer = styled.form`
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 20px;
  box-shadow: 5px 10px 17px black;
  border-radius: 10px;
  margin: auto;
`;

const CardElementContainer = styled.div`
  display: flex
  align-items: center;
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-bottom: 8px;
`;

const StyledImage = styled.img`
  width: 50px; /* Ajusta el tamaño de la imagen al 100% del contenedor */
  max-height: 50px; /* Establece una altura máxima para evitar que la imagen sea demasiado grande */
  object-fit: cover; /* Ajusta el contenido de la imagen para cubrir el contenedor */
`;

const SubmitButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 21px;
  margin: 2px;
  &:disabled {
    background-color: #a0a0a0;
    cursor: not-allowed;
  }
`;
