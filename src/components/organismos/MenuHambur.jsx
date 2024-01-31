/* eslint-disable react/prop-types */
import { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { v } from "../../styles/variables";
import { LinksArray, SecondarylinksArray } from "../../utils/dataEstatica";
import { ToggleTema } from "./ToggleTema";
import { SidebarCard } from "./sidebar/SidebarCard";

export const MenuHambur = ({ state }) => {
  const [isopen, setIsopen] = useState(false);
  return (
    <Container>
      <NavBar>
        <section>
          <HamburguerMenu onClick={() => setIsopen(!isopen)}>
            {/* <input id="checkbox" type="checkbox" /> */}

            <label
              className={isopen ? "toggle active" : "toggle"}
              htmlFor="checkbox"
            >
              <div id="bar1" className="bars"></div>
              <div id="bar2" className="bars"></div>
              <div id="bar3" className="bars"></div>
            </label>
          </HamburguerMenu>
        </section>
        <Menu $click={isopen.toString()}>
          <>
            {LinksArray.map(({ icon, label, to }) => (
              <div
                onClick={() => setIsopen(!isopen)}
                className="LinkContainer"
                key={label}
              >
                <NavLink to={to} className="Links">
                  <div className="Linkicon">{icon}</div>
                  <span className="label_ver">{label}</span>
                </NavLink>
              </div>
            ))}
            <Divider />
            {SecondarylinksArray.map(({ icon, label, to }) => (
              <div
                onClick={() => setIsopen(!isopen)}
                className="LinkContainer"
                key={label}
              >
                <NavLink to={to} className="Links">
                  <div className="Linkicon">{icon}</div>
                  <span className="label_ver">{label}</span>
                </NavLink>
              </div>
            ))}
            <ToggleTema />
            <Divider />
            {state && <SidebarCard />}
          </>
        </Menu>
      </NavBar>
    </Container>
  );
};

const Container = styled.div`
  background-color: ${({ theme }) => theme.body};
`;

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
`;

const HamburguerMenu = styled.span`
  font-size: 2rem;
  cursor: pointer;
  color: ${({ theme }) => theme.text};
  position: fixed;
  top: 30px;
  z-index: 100;

  #checkbox {
    display: none;
  }

  .toggle {
    position: relative;
    width: 30px;
    height: 30px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 5px;
    transition-duration: 0.5s;
    color: ${({ theme }) => theme.text};
    &.active {
      .bars {
        background-color: ${({ theme }) => theme.text};
        position: absolute;
        transition-duration: 0.5s;
      }
      #bar1 {
        background-color: ${({ theme }) => theme.text};
        width: 100%;
        transform: rotate(45deg);
        transition-duration: 0.5s;
      }
      #bar2 {
        background-color: ${({ theme }) => theme.text};
        transform: scaleX(0);
        transition-duration: 0.1s;
      }

      #bar3 {
        background-color: ${({ theme }) => theme.text};
        width: 100%;
        transform: rotate(-45deg);
        transition-duration: 0.5s;
      }
      .toggle {
        background-color: ${({ theme }) => theme.text};
        transition-duration: 0.5s;
        transform: rotate(180deg);
      }
    }

    .bars {
      width: 100%;
      height: 4px;
      background-color: ${({ theme }) => theme.text};
      border-radius: 4px;
    }

    #bar2 {
      transition-duration: 0.8s;
    }

    #bar1 {
      width: 50%;
    }

    #bar2 {
      width: 75%;
    }
  }
`;

const Menu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
  z-index: 10;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  background-color: ${({ theme }) =>`rgba( ${theme.bodyRgba},0.85)`};
  backdrop-filter: blur(3px);
  transform: ${({ $click }) => ($click === "true" ? "translateX(0)" : "translateX(-100%)")};
    transition: transform 0.5s ease-in-out;
    .LinkContainer {
        &:hover{
            background-color: ${({ theme }) => theme.bgAlpha};
        }
        .Links{
            width: 100vw;
            display: flex;
            align-items: center;
            text-decoration: none;
            color: ${({ theme }) => theme.text};
            height: 80px;
            .Linkicon{
                padding: ${v.smSpacing} ${v.mdSpacing};
                display: flex;
                svg{
                    font-size: 25px;
                }
            }
        }
    }
`;
const Divider = styled.div`
  height: 1px;
  width: 100%;
  background: ${(props) => props.theme.bg4};
  margin: ${() => v.lgSpacing} 0;
`;
