// /* eslint-disable no-unused-vars */
// import { useQuery } from "@tanstack/react-query";
// import { useState } from "react";
// import styled from "styled-components";
// import ProductCard from "../../moleculas/ProductCard/ProductCard";

// const fetchProducts = ({ queryKey }) => {
//   //? Hacemos destructuring de la data que pasamos por queryKey
//   const [getProducts, numberPage] = queryKey;

//   console.log("Hola soy un número de página", numberPage);
//   return fetch(
//     `https://pf-server-93lj.onrender.com/product?page=${numberPage}`
//   ).then((response) => {
//     if (response.status !== 200) {
//       throw new Error(`Something went wrong. Try again.`);
//     }

//     return response.json();
//   });
// };

// const Products = () => {
//   //! Creamos useState el cual tendrá el número de página
//   const [numberPage, setNumberPage] = useState(1);

//   //! Hacemos uso de useQuery para hacer el fetch de datos
//   //? Primer parámetro: Nombre de la query, y useStates que modificarán la petición
//   //? Segundo parámetro: función para fetchear los datos
//   const query = useQuery({
//     queryKey: ["get-products", numberPage],
//     queryFn: fetchProducts,
//   });
//   if (query.isError) return <p>{query.error.message}</p>;

//   return (
//     <Container>
//       {query.isLoading || query.isFetching ? (
//         "Loading..."
//       ) : (
//         <ContainerProducts>
//           {query?.data.map((product) => (
//             <ProductCard key={product.id} product={product} />
//           ))}
//         </ContainerProducts>
//       )}

//       <button onClick={() => setNumberPage(numberPage + 1)}>changePage</button>
//     </Container>
//   );
// };

// export default Products;

// export const ContainerProducts = styled.div`
//   display: grid;
//   width: 100%;
//   grid-template-columns: repeat(2, 1fr);
//   gap: 16px;
//   padding: 20px;
// `;

// export const Container = styled.div`
//   display: flex;
//   flex-direction: column-reverse;
// `;
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import styled from "styled-components";
import ProductCard from "../../moleculas/ProductCard/ProductCard";

const fetchProducts = ({ queryKey }) => {
  const [getProducts, numberPage] = queryKey;
  console.log("Hola soy un número de página", numberPage);
  return fetch(`https://pf-server-93lj.onrender.com/product?page=${numberPage}`)
    .then((response) => {
      if (response.status !== 200) {
        throw new Error(`Something went wrong. Try again.`);
      }
      return response.json();
    });
};

const Products = () => {
  const [numberPage, setNumberPage] = useState(1);
  const query = useQuery({
    queryKey: ["get-products", numberPage],
    queryFn: fetchProducts,
  });

  if (query.isError) return <p>{query.error.message}</p>;

  return (
    <Container>
      {query.isLoading || query.isFetching ? (
        <p>Loading...</p>
      ) : (
        <ContainerProducts>
          {query?.data?.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ContainerProducts>
      )}
      <button onClick={() => setNumberPage(numberPage + 1)}>changePage</button>
    </Container>
  );
};

export default Products;

export const ContainerProducts = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  padding: 20px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column-reverse;
`;
