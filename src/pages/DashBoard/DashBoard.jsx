import styled from 'styled-components';
import { UserDash } from './UserDash';
import { ProducDash } from './ProductDash';

export const DashBoard = () => {
  return (
    <Container>
      <UserDash />

      <ProducDash />
    </Container>
  );
};

export default DashBoard;


const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
`


