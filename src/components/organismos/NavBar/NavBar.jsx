import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsFromServer } from "../../../Redux/acctions";

function Navbar() {


  return (
    <div className="search-box">
      <form /* onSubmit={handleFormSubmit} */>
        <input
          className="search-bar"
          placeholder="Search"
          type="search"
          /* value={searchText} */
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default Navbar;