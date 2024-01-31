/*import { HomeTemplate } from "../components/templates/index";
export const Home = () => {
  return <HomeTemplate/>;
};*/

import { Cards } from "../components/moleculas";
/* import {NavBar} from "" */

export const Home = () => {
  return (
    <div>
      {"Home"}
     {/*  <div>
        <NavBar />
      </div> */}
  
      <div>
        <Cards />
      </div>

    </div>
  );
};

export default Home;
