import { useState } from 'react';
import { useNavBarStore } from '../../../Store/NavBarStore';


function Navbar() {
  const setSearchText= useNavBarStore((state)=> state.setSearchText)
  
  const [searchValue, setSearchValue] = useState('');

  const onChange=(event) => {
    setSearchValue(event.target.value)
  
  console.log(event.target.value)};
  
  const onSubmit=(event)=>{
    event.preventDefault();
    setSearchText(searchValue) 
  };
  

  return (
    <div className="search-box">
      <form onSubmit={onSubmit}>
        <input
          className="search-bar"
          placeholder="Search"
          type="search"
          value={searchValue}
          onChange={onChange}
        />
        <button>Search</button>
      </form>
    </div>
  );
}

export default Navbar;