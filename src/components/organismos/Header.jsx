/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserAuth } from "../../context/AuthContext";
import { useAuthStore } from "../../store/AuthStore";
import { v } from "../../styles/variables";
import { DesplegableUser } from "../../utils/dataEstatica";
import { BtnCircular } from "../moleculas";
import { ListaMenuDesplegable } from "./ListaMenuDesplegable";

export function Header({ stateConfig }) {

  return (
    <Container>
      
    </Container>
  );
}
const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: end;
`;
const Datauser = styled.div`
  z-index: 10;
  position: relative;
  top: 0;
  right: 0;
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  border-radius: 50px;
  margin: 15px;
  cursor: pointer;
  .imgContainer {
    height: 40px;
    width: 40px;
    min-height: 40px;
    min-width: 40px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 22px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 100%;
      object-fit: cover;
    }
  }
  &:hover {
    background-color: ${({ theme }) => theme.bg3};
  }
  .nombre {
    width: 100%;
    font-weight: 500;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-wrap: break-word;
  }
`;
