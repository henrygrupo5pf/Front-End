import React, { useState } from 'react';
import styled from 'styled-components';

export const UsersInfo = ({ info }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [inputValues, setInputValues] = useState({
    name: '',
    email: '',
    password: '',
    active: info.activeStatus
  });

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleActive =() => {
    setInputValues({...inputValues, active: inputValues.active})
    console.log(inputValues);
  }

  const handleInputChange = (e) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Container menuOpen={menuOpen}>
      <div className="id_active"> {info.id} </div>
      <div className="name">{info.name}</div>
      <div className="email">{info.email}</div>
      <div className="password">{info.password}</div>
      <Dropdown>
        <Button onClick={toggleMenu}>Modificar Usuario</Button>
        {menuOpen && (
          <div className="menu">
            <input
              type="text"
              name="input1"
              value={inputValues.name}
              onChange={handleInputChange}
              placeholder="Nuevo Nombre"
            />
            <input
              type="email"
              name="input2"
              value={inputValues.email}
              onChange={handleInputChange}
              placeholder="Nuevo Email"
            />
            <input
              type="text"
              name="input3"
              value={inputValues.password}
              onChange={handleInputChange}
              placeholder="Nueva Contraseña"
            />
            <button onClick={toggleActive} className={inputValues.active ? "Activo" : "Inactivo"}>{inputValues.active ? "Activo" : "Inactivo"}</button>

            <Button>Confirmar</Button>
          </div>
        
      )}
      </Dropdown>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;

  height: ${({ menuOpen }) => (menuOpen ? '50px' : '50px')};
  transition: height 0.3s ease;

  .id_active {
    width: 30px;
    height: 100%;
    font-size: 16px;
    background-color: #4caf50;
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
  width: 350px;
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