import React from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import styled from 'styled-components';

const PaymentButton = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)
    });

    
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <CardElementContainer>
        <CardElement />
      </CardElementContainer>
      <SubmitButton type="submit" disabled={!stripe}>
        Pagar
      </SubmitButton>
    </FormContainer>
  );
};

export default PaymentButton;

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
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-bottom: 8px;
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
