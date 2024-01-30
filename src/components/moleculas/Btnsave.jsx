/* eslint-disable react/prop-types */
import styled from "styled-components";
import { Icono } from "../atomos";

export const Btnsave = ({ funcion, titulo, bgcolor, icono, url }) => {
  return (
    <Container type="submit" $bgcolor={bgcolor}>
      <Icono>{icono}</Icono>

      <span className="btn" onClick={funcion}>
        <a href={url} target="_blank" rel="noreferrer">
          {titulo}
        </a>
      </span>
    </Container>
  );
};
const Container = styled.button`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  text-decoration: none;
  border: none;
  /* border: 2px solid black; */
  /* border-radius: 4px; */
  /* gap: 10px; */
  background-color: initial;
  z-index: 2;
  .btn {
    background: ${(props) => props.$bgcolor};
    padding: 6px 8px;
    font-weight: 700;
    font-size: 18px;
    border: 2px solid black;
    border-radius: 0.4em;
    /* box-shadow: 0.1em 0.1em #000; */
    /* transition: 0.2s; */
    /* white-space: 1px; */
    color: #000;
    a {
      text-decoration: none;
      color: #000;
    }
    cursor: pointer;
    &:hover {
      transform: translate(-0.05em, -0.05em);
      box-shadow: 0.15em 0.15em #000;
    }
    &:active {
      transform: translate(0.05em, 0.05em);
      box-shadow: 0.05em 0.05em #000;
    }
  }
`;
