import styled from 'styled-components';
import { useCartStore } from "../../Store/CartStore"
import { useUserStore } from '../../Store/UserStore';


const CheckOut = () => {
  const cartInfo = useCartStore((store) => store.cartItems)
  const userInfo = useUserStore((store)=> store.userAuth)
  console.log(userInfo);

  const BASE_URL = "https://pf-server-93lj.onrender.com"
  const TEST_URL = "http://localhost:3001"
  const STRIPE_PUBLIC_KEY = "pk_test_51OgYb1GL3gYQY1hZLqzIM3qBpw2fF1wiZmJJtsazSvdrDkPGyouIeYU5tYKzJB2WQkTQe7iDSg7OBdKH17SpA2vc00rEF6YS4x"

  const handleSubmit = async (event) => {
    event.preventDefault();
    const requestBody = {
      cartItems: cartInfo,
      userId: userInfo
    };
    console.log(requestBody);


    try {
      const response = await fetch(`${BASE_URL}/checkout`, {
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
      if (responseData.url) {
        window.location.href = responseData.url
      }


    } catch (error) {
      console.error('Error en la solicitud POST:', error.message);
    }
  } 



  return (
    <Container>
      <FormContainer onSubmit={handleSubmit}>
        Resumen de tu compra
        {cartInfo.map((item) => (
          <CardElementContainer key={item.id}>
            <StyledImage src={item.photo} alt={item.name} />
            <TextContainer>
              <h3>{item.name}</h3>
              <p>Quantity: {item.quantity}</p>
            </TextContainer>
          </CardElementContainer>
        ))}
        <SubmitButton>
          Continuar
        </SubmitButton>
      </FormContainer>
      
    </Container>
    

  );

};
export default CheckOut;


const Container = styled.div`
width: 100%;
height: 100vh;
display: flex;
align-items: center;
justify-content: center;
`;

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
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-bottom: 8px;
`;

const TextContainer = styled.div`
  margin-left: 30%;
`;

const StyledImage = styled.img`
  width: 70px; 
  max-height: 70px; 
  object-fit: cover; 
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
  transition: background-color 0.3s; 
  &:disabled {
    background-color: #a0a0a0;
    cursor: not-allowed;
  }
  &:hover {
    background-color: #45a049; 
  }
`;

