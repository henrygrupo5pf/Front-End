import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const ProductInfo = ({ info }) => {


  return (<Link to={`/dashboard/updateproduct/${info.id}`}>
  
      <Container>
        <p>ID: {info.id} </p>
        <p>Name: {info.name}</p>
        <p>Cost: {info.cost}</p>
      </Container>
  </Link>
  );
};

const Container = styled.div`
  display: flex;
  .id{
    width: 40px;
    font-size: 16px;
    background-color: #4caf50; 
    color: #fff;
    border: none;
    border-radius-left: 5px;
    text-align: center;
  }
`