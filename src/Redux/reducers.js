import * as actionTypes from "./acctionsType";

const initialState = {
  searchText: "",
  searchResults: [], // Agregamos esto para almacenar los resultados de búsqueda
  showResults: true, // Cambiado a true por defecto
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_SEARCH_TEXT:
      return {
        ...state,
        searchText: action.payload,
        showResults: false, // Puede que quieras mantener esto en true si quieres mostrar resultados al empezar a escribir
      };
    case actionTypes.SHOW_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: action.payload, // Asegúrate de actualizar los resultados de búsqueda aquí
        showResults: true,
      };
    default:
      return state;
  }
};

export default reducer;

