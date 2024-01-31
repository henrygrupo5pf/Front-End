import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import ProductCard from '../../moleculas/ProductCard/ProductCard';
import Pagination from '../../atomos/Pagination';
import FilterControls from '../../atomos/FilterControls';

const fetchProducts = ({ queryKey }) => {
  const [getProducts, numberPage, filters] = queryKey;

  const params = new URLSearchParams();
  params.append('page', numberPage);
  params.append('pageSize', filters.pageSize);

  if (filters.category) params.append('category', filters.category);
  if (filters.costRange) params.append('costRange', filters.costRange);
  if (filters.country) params.append('country', filters.country);
  if (filters.location) params.append('location', filters.location);

  const url = filters
    ? `https://pf-server-93lj.onrender.com/product/filter?${params.toString()}`
    : `https://pf-server-93lj.onrender.com/product?${params.toString()}`;

  return fetch(url)
    .then((response) => {
      if (response.status !== 200) {
        throw new Error(`Something went wrong. Try again.`);
      }

      return response.json();
    })
    .then((data) => {
      console.log(data); // Log the data to see the structure of the response
      return data;
    });

};

const Products = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [filters, setFilters] = useState({
    pageSize: 10,
    category: '',
    costRange: '',
    country: '',
    location: '',
  });

  const query = useQuery({
    queryKey: ['get-products', pageNumber, filters],
    queryFn: fetchProducts,
  });

  const handleApplyFilters = (newFilters) => {
    setPageNumber(1); // Reset page number when applying new filters
    setFilters({ ...filters, ...newFilters });
  };

  const handleClearFilters = () => {
    setPageNumber(1); // Reset page number when clearing filters
    setFilters({
      pageSize: 10,
      category: '',
      costRange: '',
      country: '',
      location: '',
    });
  };

  if (query.isError) return <p>{query.error.message}</p>;

  return (
    <Container>
      <FilterControls applyFilters={handleApplyFilters} clearFilters={handleClearFilters}/>
      {query.isLoading || query.isFetching ? (
        'Loading...'
      ) : (
        <>
          <ContainerProducts>
            {query?.data.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ContainerProducts>
          <Pagination
            numberPage={pageNumber}
            setNumberPage={setPageNumber}
            totalPages={query?.data?.totalPages}
          />
        </>
      )}
    </Container>
  );
};

const ContainerProducts = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  padding: 20px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column-reverse;
`;

export default Products;