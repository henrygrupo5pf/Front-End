import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import { useNavBarStore } from '../../../Store/NavBarStore';

// Styled components
const SearchBox = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
`;

const SearchBar = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
  flex: 1;

  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 5px rgba(52, 152, 219, 0.5);
  }
`;

const SearchButton = styled.button`
padding: 10px 15px;
font-size: 16px;
background-color: #4caf50; 
color: #fff;
border: none;
border-radius: 5px;
cursor: pointer;
transition: background-color 0.3s ease;

&:hover {
  background-color: #45a049; 
  }
`;

function Navbar() {
  const setSearchText = useNavBarStore((state) => state.setSearchText);
  const [searchValue, setSearchValue] = useState('');

  const onChange = (event) => {
    setSearchValue(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setSearchText(searchValue);
  };

  return (
    <SearchBox>
      <form onSubmit={onSubmit}>
        <SearchBar
          className="search-bar"
          placeholder="Search for something..."
          type="search"
          value={searchValue}
          onChange={onChange}
        />
        <SearchButton type="submit">Search</SearchButton>
      </form>
    </SearchBox>
  );
}

export default Navbar;


