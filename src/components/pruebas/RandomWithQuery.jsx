import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";

const fetchNumber = () => {
  return fetch(
    "https://www.random.org/integers/?num=1&min=1&max=100&col=1&base=10&format=plain&rnd=new"
  ).then((response) => {
    if (response.status !== 200) {
      throw new Error(`Something went wrong. Try again.`);
    }

    return response.text();
  });
};

// Tenemos useQuery que es una función que contiene un objeto con dos props
// querykey: tendrá el nombre de la función
// queryFn: Aquí irá la función encargada de realizar la acción que asignemos

export const RandomWithQuery = () => {
  const query = useQuery({ queryKey: ["random"], queryFn: fetchNumber });

  if (query.isError) return <p>{query.error.message}</p>;

  return (
    <Container>
      <button className="btn" onClick={() => query.refetch()}>
        Random number:{" "}
        {query.isLoading || query.isFetching ? "..." : query.data}
      </button>
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  overflow: hidden;

  .btn {
    padding: 8px 16px;
    border-radius: 4px;
    border: 1px solid #ccc;
    background-color: #fff;
    font-weight: 700;
  }
`;
