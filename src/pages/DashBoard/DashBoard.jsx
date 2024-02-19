import styled from 'styled-components';
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { UsersInfo } from "../../components/moleculas/UserInfo/UserInfo";
import { Link } from 'react-router-dom';

export const DashBoard = () => {
  const [searchUsers, setSearchUsers] = useState('');
  const [searchType, setSearchType] = useState('ALL');
  const [queryUser, setQueryUser] = useState("");
  const [queryType, setQueryType] = useState("");
  const [error, setError] = useState(null);

  const fetchUsers = ({ queryKey }) => {
    const [queryUser, queryType] = queryKey;

    const url = queryType === "ALL"
      ? `https://pf-server-93lj.onrender.com`
      : `https://pf-server-93lj.onrender.com/user/${queryUser}`;


    return fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Something went wrong. Try again. Código de error: ${response.status}`);
        }

        return response.json();

      })
      .then((data) => {

        if (Array.isArray(data.Users) && data.Users.length === 0) {

          setError("No users found. Please try searching with different parameters");
        }
        return data;
      })
      .catch((error) => {
        setError("You have entered a wrong parameter. Remember that ID must be a number ");
        return 0
      });
  };

  const query = useQuery({
    queryKey: [queryUser, queryType],
    queryFn: fetchUsers,
  });

  const onSubmit = (event) => {
    event.preventDefault();
    setQueryUser(searchUsers);
    setQueryType(searchType);
    setError(null);
  };

  const onChange = (event) => {
    setSearchUsers(event.target.value);
  };


  //FALTA LA PARTE DE PRODUCTO 

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
            <select
              value={searchType}
              onChange={(event) => setSearchType(event.target.value)}
            >
              <option value="ALL">ALL</option>
              <option value="ID">ID</option>
            </select>
            <SearchButton type="submit">Search</SearchButton>
          </form>
        </SearchBox>

        <UsersContainer>
          {error ? (
            <>{error}</>
          ) : query.isLoading || query.isFetching ?
            ("Loading..."
            ) : (Array.isArray(query?.data.Users)) ?
              (query?.data.Users.map(user => <UserBox><UsersInfo key={user.id} info={user} /></UserBox>)
              ) : (<UserBox><UsersInfo info={query?.data} /></UserBox>)
          }
        </UsersContainer>

        <ButtonsContainer>
          <Link to="/dashboard/usercreate">
            <Button > Crear Usuario</Button>
          </Link>
        </ButtonsContainer>
      </InfoContainer>


      {/*    <InfoContainer>
        <SearchBox>
          <form onSubmit={onSubmit}>
            <SearchBar
              className="search-bar"
              placeholder="Search for something..."
              type="search"
              value={searchUsers}
              onChange={onChange}
            />
            <select
              value={searchType}
              onChange={(event) => setSearchType(event.target.value)}
            >
              <option value="ALL">ALL</option>
              <option value="ID">ID</option>
            </select>
            <SearchButton type="submit">Search</SearchButton>
          </form>
        </SearchBox>

        <UsersContainer>
          {error ? (
            <>{error}</>
          ) : query.isLoading || query.isFetching ?
            ("Loading..."
            ) : (Array.isArray(query?.data.Users)) ?
              (query?.data.Users.map(user => <UserBox><UsersInfo key={user.id} info={user} /></UserBox>)
              ) : (<UserBox><UsersInfo info={query?.data} /></UserBox>)
          }
        </UsersContainer>

        <ButtonsContainer>
          <Button> Crear Usuario</Button>
          <Button> Modificar Usuario</Button>
        </ButtonsContainer>
      </InfoContainer> */}
    </Container>
  );
};

export default DashBoard;


const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
`
const UsersContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  height: 500px;
  overflow-y: scroll;
  padding: 10px`;

const UserBox = styled.div`
  border-radius: 5px;
  border: 1px solid black;
  width: 80%;
  background-color: white;
  margin: 3px;
  height: 100px;
  `;

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
`

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
  margin-bottom: 10px;
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
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 10px 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 80%;
`;
const Button = styled.div`

  font-size: 16px;
  background-color: #4caf50; 
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  padding: 10px 15px;
  border: 1px solid #ccc;
  width: 350px;
`;



