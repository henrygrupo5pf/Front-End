// // actions.js

// import * as actionTypes from "./acctionsType";
// import axios from "axios";

// const urlBase = "https://pf-server-93lj.onrender.com/product";

// // Acción para actualizar el texto de búsqueda en el estado
// // En tu archivo de acciones
// export const setSearchText = (text) => {
//     console.log("Despachando setSearchText con:", text);
//     return {
//         type: actionTypes.SET_SEARCH_TEXT,
//         payload: text,
//     };
// };


// // Acción para realizar la petición al servidor y obtener los productos filtrados
// export const getProductsFromServer = (searchText) => {
//   return async (dispatch) => {
//     try {
//       // Construimos la URL dependiendo de si hay texto de búsqueda o no
//       const url = searchText ? `${urlBase}/product?name=${searchText}` : `${urlBase}/product`;
//       // Realizamos la petición GET al servidor
//       const response = await axios.get(url);
//       // Extraemos los resultados de la petición
//       const searchResults = response.data;
//       // Despachamos la acción para mostrar los resultados de búsqueda en el estado
//       dispatch(showSearchResults(searchResults));
//     } catch (error) {
//       console.error("Error al obtener productos:", error);
//     }
//   };
// };

// // Acción para actualizar el estado con los resultados de la búsqueda
// export const showSearchResults = (results) => {
//   return {
//     type: actionTypes.SHOW_SEARCH_RESULTS,
//     payload: results,
//   };
// };
import * as actionTypes from "./acctionsType";
import axios from "axios";

const urlBase = "https://pf-server-93lj.onrender.com/product/name";

export const setSearchText = (text) => {
    return {
      type: actionTypes.SET_SEARCH_TEXT,
      payload: text,
    };
  };
  
  export const showSearchResults = (results) => {
    return {
      type: actionTypes.SHOW_SEARCH_RESULTS,
      payload: results,
    };
  };

  export const getProductsFromServer = (searchText) => {
    return async (dispatch) => {
      try {
        // Asegúrate de usar comillas invertidas para los literales de plantilla
        const response = await axios.get(`${urlBase}?name=${searchText}`);
        const searchResults = response.data;
  
        if (searchResults && searchResults.length > 0) {
          dispatch(showSearchResults(searchResults));
        } else {
          dispatch(showSearchResults([])); 
        }
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };
  };
  