import styled from 'styled-components';

export const DashBoard = () => {
    return(
        <Container>
            <InfoContainer>
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
                <Info>
                    Aca van todos los users
                </Info>
                <ButtonsContainer>
                    <Button> Crear Usuario</Button>
                    <Button> Modificar Usuario</Button>
                </ButtonsContainer>
            </InfoContainer>

            <InfoContainer>
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
                <Info>
                    Aca van todos los users
                </Info>
                <ButtonsContainer>
                    <Button> Crear Usuario</Button>
                    <Button> Modificar Usuario</Button>
                </ButtonsContainer>
            </InfoContainer>
        </Container>
    )
}

export default DashBoard;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
