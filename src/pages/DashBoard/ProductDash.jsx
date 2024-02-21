import styled from 'styled-components';
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { ProductInfo } from "../../components/moleculas/ProductInfo/ProductInfo";
import { Link } from 'react-router-dom';


//FALTA ACTUALIZAR LOS DATOS PARA HACERLO DE PROCUTO. AHORA ES UNA COPIA DE Product

export const ProducDash = () => {
  const [searchProducts, setSearchProducts] = useState('');
  const [searchType, setSearchType] = useState('ALL');
  const [queryProduct, setQueryProduct] = useState("");
  const [queryType, setQueryType] = useState("");
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const fetchProducts = async ({ queryKey }) => {
    const [queryProduct, queryType, page] = queryKey;

    const url = queryType === "ALL"
      ? `https://pf-server-93lj.onrender.com/product?page=${page}`
      : `https://pf-server-93lj.onrender.com/product/${queryProduct}?page=${page}`;


    return await fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Something went wrong. Try again. Código de error: ${response.status}`);
        }

        return response.json();

      })
      .then((data) => {

        if (Array.isArray(data.Products) && data.Products.length === 0) {

          setError("No Products found. Please try searching with different parameters");
        }
        return data;
      })
      .catch((error) => {
        setError("You have entered a wrong parameter. Remember that ID must be a number ");
        return 0
      });
  };

  const query = useQuery({
    queryKey: [queryProduct, queryType, page],
    queryFn: fetchProducts,
  });

  useEffect(() => {
    const timerId = setTimeout(() => {
      setQueryProduct(searchProducts);
      setQueryType(searchType);
      setError(null);
    }, 50);

    return () => clearTimeout(timerId);

  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    setQueryProduct(searchProducts);
    setQueryType(searchType);
    setError(null);
    setPage(1);
    query.refetch();
  };

  const onChange = (event) => {
    setSearchProducts(event.target.value);
  };

  const handleMin = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleMax = () => {
    if (query) {
      if (page < query.data.totalPages) {

        setPage(page + 1);
      }
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
              value={searchProducts}
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

        <ProductsContainer>
          {error ? (
            <>{error}</>
          ) : query.isLoading || query.isFetching ?
            ("Loading..."
            ) : (Array.isArray(query?.data.products)) ?
              (query?.data.products.map(product => <ProductBox><ProductInfo key={product.id} info={product} /></ProductBox>)
              ) : (<ProductBox><ProductInfo info={query?.data} /></ProductBox>)
          }
        </ProductsContainer>

        <PaginationContainer>
          <PaginationButton onClick={handleMin}>Previous</PaginationButton>
          <PaginationText>Page {page}</PaginationText>
          <PaginationButton onClick={handleMax}>Next</PaginationButton>
        </PaginationContainer>

        <ButtonsContainer>
          <Link className='Link' to="/dashboard/ProductForm">
            <Button > Crear Producto</Button>
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
`
const ProductsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  height: 500px;
  overflow-y: scroll;
  padding: 10px`;

const ProductBox = styled.div`
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
  .Link{
    text-decoration: none;
  }
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
  transition: background-color 0.3s ease;

&:hover {
  background-color: #45a049; 
  }
`;

const PaginationContainer = styled.div`
  border: 1px solid #ccc;
`;

const PaginationButton = styled.div`
  border: 1px solid #ccc;
`;

const PaginationText = styled.div`
  border: 1px solid #ccc;
`;







