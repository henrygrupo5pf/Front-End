import React, { useState } from 'react';
import styled from 'styled-components';

export const UsersInfo = ({ info }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [inputValues, setInputValues] = useState({
    input1: '',
    input2: '',
    input3: ''
  });

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

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
      <Button onClick={toggleMenu}>Modificar Usuario</Button>
      {menuOpen && (
        <div className="menu">
          <input
            type="text"
            name="input1"
            value={inputValues.input1}
            onChange={handleInputChange}
            placeholder="Input 1"
          />
          <input
            type="text"
            name="input2"
            value={inputValues.input2}
            onChange={handleInputChange}
            placeholder="Input 2"
          />
          <input
            type="text"
            name="input3"
            value={inputValues.input3}
            onChange={handleInputChange}
            placeholder="Input 3"
          />
        </div>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: ${({ menuOpen }) => (menuOpen ? '150px' : '50px')};
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
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    background-color: #f0f0f0;
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