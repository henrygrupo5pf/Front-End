/* eslint-disable no-unused-vars */
import { useState } from "react";
import styled from "styled-components";
import Products from '../organismos/Products/Products';
import Navbar from "../organismos/NavBar/NavBar";
//import { Header } from "../organismos/Header";

export const HomeTemplate = () => {
  const [state, setState] = useState(false);
  return (
    <Container>
      <header className="header">
        {/*<Header
          stateConfig={{ state: state, setState: () => setState(!state) }}
  />*/}
      </header>
      <section className="area1"></section>
      <section className="area2">
        <Navbar />
      </section>
      <section className="main">
        <Products />
      </section>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.bgtotal};
  color: ${({ theme }) => theme.text};

  display: grid;
  grid-template:
    "header" 100px
    "area1" 100px
    "area2" 100px
    "main" auto;

  .header {
    grid-area: header;
    background-color: rgba(103, 93, 241, 0.14);
    display: flex;
    align-items: center;
  }
  .area1 {
    grid-area: area1;
    background-color: rgba(229, 67, 26, 0.14);
    display: flex;
    align-items: center;
  }
  .area2 {
    grid-area: area2;
    background-color: rgba(77, 237, 106, 0.14);
    display: flex;
    align-items: center;
    justify-content: center;  
  }
  .main {
    grid-area: main;
    background-color: rgba(13, 9, 24, 0.14);
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
