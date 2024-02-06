import styled from 'styled-components';
import { useCartStore } from "../Store/CartStore";


const CheckOut = () => {
  const cartInfo = useCartStore((store) => store.cartItems)
  console.log("CART INFO:    ", cartInfo);
  const BASE_URL = "https://pf-server-93lj.onrender.com"
  const BASE_URL2 = "http://localhost:3001"
  const STRIPE_PUBLIC_KEY = "pk_test_51OgYb1GL3gYQY1hZLqzIM3qBpw2fF1wiZmJJtsazSvdrDkPGyouIeYU5tYKzJB2WQkTQe7iDSg7OBdKH17SpA2vc00rEF6YS4x"

  const handleSubmit = async (event) => {
    event.preventDefault();
    const requestBody = {
      cartItems: cartInfo,
    };
  
    try {
      const response = await fetch(`${BASE_URL2}/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${STRIPE_PUBLIC_KEY}`
        },
        body: JSON.stringify(requestBody),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const responseData = await response.json();
      if(responseData.url){
        window.location.href =responseData.url
      }
      
  
    } catch (error) {
      console.error('Error en la solicitud POST:', error.message);
    }
  }



  return (
    <FormContainer onSubmit={handleSubmit}>
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
