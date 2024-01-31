// import { HomeTemplate } from "../components/templates/index";
// import React from "react";
// import Navbar from "../components/organismos/navBar/navBar";
// export const Home = () => {

//   return (
//     <div>
//       <h1>
//         <Navbar/>
//       </h1>

//         <HomeTemplate/>
      
//     </div>
       
//    );


// };

// export default Home;
import { HomeTemplate } from "../components/templates/index";
import React from 'react';
import { useSelector } from 'react-redux';
// import { Cards } from "../components/moleculas";
import Navbar from "../components/organismos/navBar/navBar";

export const Home = () => {
  const searchText = useSelector((state) => state.searchText);
  const showResults = useSelector((state) => state.showResults); 

  // console.log('Estado actual de searchText:', searchText);
  // console.log('Estado actual de showResults:', showResults);

  return (
    <div>
      {'Home'}
      <div>
        <Navbar />
        <HomeTemplate/>;
      </div>

      <div>
        {/* <Cards searchText={searchText} showResults={showResults} />  */}
        
      </div>
    </div>
  );
};

export default Home;
