import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const UsersInfo = ({ info }) => {


  return (
    <Container>
      <div className={info.activeStatus ? "id" : "id_inactive"}> {info.id}  </div>
      <div className="name"> {info.name} </div>
      <div className="email"> {info.description} </div>
      <Link to={`/dashboard/updateuser/${info.id}`}>
        <Button>Editar</Button>
      </Link>
      
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: ${({ menuOpen }) => (menuOpen ? '50px' : '50px')};
  transition: height 0.3s ease;

  .id{
    width: 30px;
    height: 100%;
    font-size: 16px;
    background-color: #4caf50;
    color: #fff;
    border: none;
    border-radius-left: 5px;
    text-align: center;
  }

  .id_inactive{
    width: 30px;
    height: 100%;
    font-size: 16px;
    background-color: red;
    color: #fff;
    border: none;
    border-radius-left: 5px;
    text-align: center;
  }

  .name {
    width: 180px;
  }

  .password {
    width: 150px;
  }

  .email {
    width: 300px;
  }

  .menu {
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    background-color: #f0f0f0;
    z-index: 0;
  }

  

`;

const Button = styled.button`
  width: 150px;
  font-size: 16px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius-left: 5px;
  text-align: center;
  height: 35px;
`;
const ActiveButton = styled.button`
  width: 150px;
  font-size: 16px;
  background-color: #2596be;
  color: #fff;
  border: none;
  border-radius-left: 5px;
  text-align: center;
  height: 25px;
`;

const Dropdown = styled.div`
display:block
.Activo, .Inactivo{
    width: 150px;
    font-size: 16px;

    color: #fff;
    border: none;
    border-radius-left: 5px;
    text-align: center;
    height: 25px;
  }

  .Inactivo{
    background-color: red;
  }
`