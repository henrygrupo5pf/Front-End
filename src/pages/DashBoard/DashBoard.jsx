import styled from 'styled-components';
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { UsersInfo } from "../../components/moleculas/UserInfo/UserInfo"

export const DashBoard = () => {
  const [searchUsers, setSearchUsers] = useState('');
  

 const url= "http://localhost:3001/user"

/*   const fetchUsers = ({ queryKey }) => {
    const [searchUsers]  = queryKey;
 
    return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Something went wrong. Try again. Código de error: ${response.status}`);
      }

      return response.json();

    })
    .then((data) => {
      if (data.users.length === 0) {

        throw new Error("No users found. Please try searching with different parameter.");
      }
      return data;
    });

  };

  const query = useQuery({
    queryKey: [userForFetch],
    queryFn: fetchUsers,
    
  }); */


  const onSubmit = (event) => {
    event.preventDefault();
    let userForFetch=searchUsers
    console.log(userForFetch);
  };
 

  const onChange = (event) => {
    setSearchUsers(event.target.value);
  };
  console.log(searchUsers);
  return (
    <Container>
      <InfoContainer>
        <SearchBox>
          <form onSubmit={onSubmit}>
            <SearchBar
              className="search-bar"
              placeholder="Search for something..."
              type="search"
              value={searchUsers}
              onChange={onChange}
            />
            <SearchButton type="submit">Search</SearchButton>
          </form>
        </SearchBox>

        <UsersInfo>

        </UsersInfo>

        <ButtonsContainer>
          <Button> Crear Usuario</Button>
          <Button> Modificar Usuario</Button>
        </ButtonsContainer>
      </InfoContainer>


      {/* <InfoContainer>
        <SearchBox>
          <form onSubmit={onSubmit}>
            <SearchBar
              className="search-bar"
              placeholder="Search for something..."
              type="search"
            // value={searchValue}
            // onChange={onChange}
            />
            <SearchButton type="submit">Search</SearchButton>
          </form>
        </SearchBox>

        <UsersInfo>
          Aca van todos los users
        </UsersInfo>

        <ButtonsContainer>
          <Button> Crear Usuario</Button>
          <Button> Modificar Usuario</Button>
        </ButtonsContainer>
      </InfoContainer> */}
    </Container>

  )
}

export default DashBoard;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
`

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

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

const ButtonsContainer = styled.div`
padding: 10px 15px;
border: 1px solid #ccc;
  border-radius: 5px;
`;
const Button = styled.div`
padding: 10px 15px;
border: 1px solid #ccc;
  border-radius: 5px;
`;



  /*  const params = new URLSearchParams();
    params.append();

    const url = params.toString() === ""
    ? `http://localhost:3001/user`
    : `http://localhost:3001/user/${params.toString()}` */