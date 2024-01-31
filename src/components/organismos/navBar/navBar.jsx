import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchText, getProductsFromServer } from "../../../Redux/acctions";

function Navbar() {
  const dispatch = useDispatch();
  const searchText = useSelector((state) => state.searchText);

  // funcion de busqueda

  // navBar.jsx

  const handleSearchChange = (e) => {
  const searchText = e.target.value;
  dispatch(setSearchText(searchText));
};

//mandar la peticion
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const searchTerm = searchText.trim()
    
    dispatch(getProductsFromServer(searchTerm));
    
  };

  return (
    <div className="search-box">
      <form onSubmit={handleFormSubmit}>
        <input
          className="search-bar"
          placeholder="Search"
          type="search"
          value={searchText}
          onChange={handleSearchChange}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default Navbar;