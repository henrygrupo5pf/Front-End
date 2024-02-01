import { useState } from 'react';



function Navbar() {
  
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="search-box">
      <form >
        <input
          className="search-bar"
          placeholder="Search"
          type="search"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
        />
        <button >Search</button>
      </form>
    </div>
  );
}

export default Navbar;