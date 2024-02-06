/* eslint-disable no-unused-vars */
import { useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "../../App";
import { Device } from "../../styles/breakpoints";

export function LoginTemplate() {
  const { setTheme } = useContext(ThemeContext);
  setTheme("light");
  

  return (
    <Container>
      
    </Container>
  );
}
const Container = styled.div`
  background-size: cover;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: #262626;
  @media ${Device.tablet} {
    grid-template-columns: 1fr 2fr;
  }
  .contentLogo {
    position: absolute;
    top: 15px;
    font-weight: 700;
    display: flex;
    left: 15px;
    align-items: center;
    color: #fff;

    img {
      width: 50px;
    }
  }
  .cuadros {
    transition: cubic-bezier(0.4, 0, 0.2, 1) 0.6s;
    position: absolute;
    height: 100%;
    width: 100%;
    bottom: 0;
    transition: 0.6s;
  }

  .bannerlateral {
    background-color: #fc6b32;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 80%;
    }
  }
  .contentCard {
    grid-column: 2;
    background-color: #ffffff;
    background-size: cover;
    z-index: 100;
    position: relative;
    gap: 30px;
    display: flex;
    padding: 20px;
    box-shadow: 8px 5px 18px 3px rgba(0, 0, 0, 0.35);
    justify-content: center;
    width: auto;
    height: 100%;
    width: 100%;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    .card {
      padding-top: 80px;
      width: 100%;
      @media ${Device.laptop} {
        width: 50%;
      }
    }
    .version {
      color: #727272;
      text-align: start;
    }
    .contentImg {
      width: 100%;
      display: flex;
      justify-content: center;

      img {
        width: 40%;

        animation: flotar 1.5s ease-in-out infinite alternate;
      }
    }
    .frase {
      color: #fc6c32;
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 30px;
    }
    .ayuda {
      position: absolute;
      top: 15px;
      right: 15px;
      color: #8d8d8d;
      font-size: 15px;
      font-weight: 500;
    }
    &:hover {
      .contentsvg {
        top: -100px;
        opacity: 1;
      }
      .cuadros {
        transform: rotate(37deg) rotateX(5deg) rotateY(12deg) rotate(3deg)
          skew(2deg) skewY(1deg) scaleX(1.2) scaleY(1.2);
        color: red;
      }
    }
  }
  @keyframes flotar {
    0% {
      transform: translate(0, 0px);
    }
    50% {
      transform: translate(0, 15px);
    }
    100% {
      transform: translate(0, -0px);
    }
  }
`;
const Titulo = styled.span`
  font-size: 3rem;
  font-weight: 700;
`;
const ContainerBtn = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: center;
  gap: 10px;
`;
const TextoStateInicio = styled.p`
  color: #fc7575;
`;