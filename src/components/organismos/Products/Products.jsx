import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import styled from "styled-components";
import { FilterControls, Pagination } from "../../atomos/index";
import { ProductCard } from "../../moleculas/index";
import { useNavBarStore } from '../../../Store/NavBarStore';



const fetchProducts = ({ queryKey }) => {
  const [numberPage, filters, searchText] = queryKey;
    

  const params = new URLSearchParams();
  params.append("page", numberPage);
  params.append("pageSize", filters.pageSize);

  if (searchText != "") params.append("name", searchText)
  
  if (filters.category) params.append("category", filters.category);
  if (filters.costRange) params.append("costRange", filters.costRange);
  if (filters.country) params.append("country", filters.country);
  if (filters.location) params.append("location", filters.location);

  console.log(params.toString());
  
  const url = searchText != ""
  ? `https://pf-server-93lj.onrender.com/product/filter?${params.toString()}`
  : `https://pf-server-93lj.onrender.com/product`; 
  


  return fetch(url)
    .then((response) => {
      if (response.status !== 200) {
        throw new Error(`Something went wrong. Try again. Código de error: ${response.status}`);
      }

      return response.json();
    })
    .then((data, ) => {
    
      console.log(data);
      
      
      return data;
    });
};

const Products = () => {
  const searchText=useNavBarStore((state)=>state.searchText)
  const setSearchText=useNavBarStore((state)=>state.setSearchText)
 
  const [pageNumber, setPageNumber] = useState(1);
  const [filters, setFilters] = useState({
    pageSize: 10,
    category: "",
    costRange: "",
    country: "",
    location: "",
  });

  const query = useQuery({
    queryKey: [pageNumber, filters, searchText, setSearchText],
    queryFn: fetchProducts,
  });

  const handleApplyFilters = (newFilters) => {
    setPageNumber(1);
    setFilters({ ...filters, ...newFilters });
  };

  const handleClearFilters = () => {
    setPageNumber(1);
    setFilters({
      pageSize: 10,
      category: "",
      costRange: "",
      country: "",
      location: "",
    });
  };

  if (query.isError) return <p>{query.error.message}</p>;

  return (
    <Container>
      {query.isLoading || query.isFetching ? (
        "Loading..."
      ) : (
        <>
          <Pagination
            numberPage={pageNumber}
            setNumberPage={setPageNumber}
            totalPages={query?.data?.totalPages}
          />
          <ContainerProducts>
            {query?.data.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ContainerProducts>
          <FilterControls
            applyFilters={handleApplyFilters}
            clearFilters={handleClearFilters}
          />
        </>
      )}
    </Container>
  );
};

const ContainerProducts = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  padding: 20px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column-reverse;
`;

export default Products;
