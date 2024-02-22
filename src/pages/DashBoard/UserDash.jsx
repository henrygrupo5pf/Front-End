import styled from 'styled-components';
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { UsersInfo } from "../../components/moleculas/UserInfo/UserInfo";
import { Link } from 'react-router-dom';

export const UserDash = () => {
  const [searchUsers, setSearchUsers] = useState('');
  const [searchType, setSearchType] = useState('ALL');
  const [queryUser, setQueryUser] = useState("");
  const [queryType, setQueryType] = useState("");
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const fetchUsers = async ({ queryKey }) => {
    const [queryUser, queryType, page] = queryKey;

    const url = queryType === "ALL"
      ? `https://pf-server-93lj.onrender.com/user?page=${page}`
      : `https://pf-server-93lj.onrender.com/user/${queryUser}?page=${page}`;


    return await fetch(url)
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
    queryKey: [queryUser, queryType, page],
    queryFn: fetchUsers,
  });

  const onSubmit = (event) => {
    event.preventDefault();
    setQueryUser(searchUsers);
    setQueryType(searchType);
    setError(null);
    setPage(1);
  };

  const onChange = (event) => {
    setSearchUsers(event.target.value);
  };

  const handleMin = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleMax = () => {
    if (page < query.data.totalPages) {

      setPage(page + 1);
    }

  };

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

        <PaginationContainer>
          <PaginationButton onClick={handleMin}>Previous</PaginationButton>
          <PaginationText>Page {page}</PaginationText>
          <PaginationButton onClick={handleMax}>Next</PaginationButton>
        </PaginationContainer>

        <ButtonsContainer>
          <Link className='Link' to="/dashboard/usercreate">
            <Button > Crear Usuario</Button>
          </Link>
        </ButtonsContainer>
      </InfoContainer>
    </Container>
  );
};



const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  
  .id{
    width: 30px;
    height: 100%;
    font-size: 16px;
    background-color: #4caf50;
    color: #fff;
    border: none;
  }
  
  .name {
    width: 180px;
    overflow-y: auto;
    
  }

  .email {
    width: 300px;
    height: 100%;
    overflow-y: auto;
  }
`;

const UsersContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 500px;
  overflow-y: scroll;
  padding: 10px;
`;

const UserBox = styled.div`
  border-radius: 5px;
  border: 1px solid black;
  width: 100%;
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
`;

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
  transform: scale(1.05);
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
  .Link{
    text-decoration: none;
  }
`;
const Button = styled.button`
  font-size: 16px;
  background-color: #4caf50; 
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  padding: 10px 15px;
  border: 1px solid #ccc;
  width: 150px;
  
  
  &:hover {
    background-color: #45a049;
    transform: scale(1.05);
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const PaginationButton = styled.button`
  margin: 0 5px;
  padding: 5px 10px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
    transform: scale(1.05);
  }
`;

const PaginationText = styled.div`
  margin: 0 5px;
`;