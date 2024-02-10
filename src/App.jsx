import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createContext, useState } from "react";
import { useLocation } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { Dark, Light } from "../src/styles/themes";
import { Sidebar } from "./components/organismos/sidebar/Sidebar";
import MyRoutes from "./routes/routes";
import { Device } from "./styles/breakpoints";
import { MenuHambur } from "./components/organismos/MenuHambur";



export const ThemeContext = createContext(null);
function App() {
  const [themeuse, setTheme] = useState("light");
  const theme = themeuse === "light" ? "light" : "dark";
  const themeStyle = theme === "light" ? Light : Dark;
  const [sidebar, setSidebar] = useState(false);
  const { pathname } = useLocation();

  return (

    <ThemeContext.Provider value={{ theme, setTheme }}>
      <ThemeProvider theme={themeStyle}>
        <Container className={sidebar ? "active" : ""}>
          <section className="ContentSideBar">
            <Sidebar state={sidebar} setState={setSidebar} />
          </section>
          <section className="ContentMenuHamburguer">
            <MenuHambur state={sidebar} setState={setSidebar} />
          </section>
          <section className="ContentRoutes">
              <MyRoutes />
          </section>
        </Container>
        <ReactQueryDevtools initialIsOpen={false} />
      </ThemeProvider>
    </ThemeContext.Provider>

  );
}
export default App;
const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  background-color: ${({ theme }) => theme.bgtotal};
  .ContentSideBar {
    display: none;
  }
  .ContentMenuHamburguer {
    display: block;
    position: absolute;
    left: 20px;
  }
  @media ${Device.tablet} {
    grid-template-columns: 65px 1fr;
    &.active {
      grid-template-columns: 220px 1fr;
    }
    .ContentSideBar {
      display: initial;
    }
    .ContentMenuHamburguer {
      display: none;
    }
  }
  .ContentRoutes {
    grid-column: 1;
    width: 100%;
    @media ${Device.tablet} {
      grid-column: 2;
    }
  }
`;
