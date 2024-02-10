import { useEffect } from "react";
import styled from "styled-components";
import { InfinitySpin } from 'react-loader-spinner';

//Intente usar useHistory pero no me deja. Me salta error de vite

const Success = () => {
    useEffect(() => {
        let countdown = 7;

        const countdownInterval = setInterval(() => {
            if (countdown === 0) {
                window.location.href = 'http://localhost:5173';
            }
            countdown -= 1;
        }, 1000);

        return () => clearInterval(countdownInterval);
    }, []);

    return (
        <Container>
            <SuccessContainer>
                <SuccessMessage>Thank you for your purchase</SuccessMessage>
                <CountdownMessage>You will be redirected to the Homepage in a few seconds</CountdownMessage>
                <InfinitySpin />
            </SuccessContainer>
        </Container>
    );
};

export default Success;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SuccessContainer = styled.div`
  background-color: white;
  width: 600px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  box-shadow: 5px 10px 17px black;
  border-radius: 10px; 
`;

const SuccessMessage = styled.p`
  font-size: 1.5em;
  font-weight: bold;
  margin: 20px;
  color: #45a049
`;

const CountdownMessage = styled.p`
  font-size: 1em;
  color: #555;
`;
