import styled from 'styled-components';
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { UsersInfo } from "../../components/moleculas/UserInfo/UserInfo";

export const DashBoard = () => {
  const [searchUsers, setSearchUsers] = useState('');
  const [searchType, setSearchType] = useState('ALL');
  const [queryUser, setQueryUser] = useState("");
  const [queryType, setQueryType] = useState("");
  const [error, setError] = useState(null);

  const fetchUsers = ({ queryKey }) => {
    const [queryUser, queryType] = queryKey;

    const url = queryType === "ALL"
      ? `http://localhost:3001/user`
      : `http://localhost:3001/user/${queryUser}`;

    return fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Something went wrong. Try again. Código de error: ${response.status}`);
        }

        return response.json();

      })
      .then((data) => {

        if (Array.isArray(data.Users) && data.Users.length === 0) {

          throw new Error("No users found. Please try searching with different parameters");
        }
        return data;
      })
      .catch((error) => {
        setError("Algo ha pasado. Inténtalo de nuevo.");
        throw new Error("Algo ha pasado. Inténtalo de nuevo.");
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
    query.refetch();
    setError(null);
  };

  const onChange = (event) => {
    setSearchUsers(event.target.value);
  };

  //FALTAN LOS BOTONES DE CREAR USUARIO Y MODIFICAR USUARIO

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
          <Button> Crear Usuario</Button>
          <Button> Modificar Usuario</Button>
        </ButtonsContainer>
      </InfoContainer>
    </Container>
  );
};

export default DashBoard;


const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
`
const UsersContainer = styled.div`
  border: 1px solid black;
  padding: 10px`;

const UserBox = styled.div`
border: 1px solid black;
padding: 5px`;

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
padding: 10px 15px;
border: 1px solid #ccc;
  border-radius: 5px;
`;
const Button = styled.div`
padding: 10px 15px;
border: 1px solid #ccc;
  border-radius: 5px;
`;



