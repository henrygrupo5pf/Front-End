import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {setSearchText} from "../../../Redux/acctions";

function Navbar() {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(setSearchText(searchValue));
  };

  return (
    <div className="search-box">
      <form onSubmit={handleSubmit}>
        <input
          className="search-bar"
          placeholder="Search"
          type="search"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default Navbar;