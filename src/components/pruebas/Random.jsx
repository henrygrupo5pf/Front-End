import { useEffect, useReducer, useState } from "react";
import styled from "styled-components";


export const Random = () => {
  const [key, forceUpdate] = useReducer((x) => x + 1, 0);
  const [num, setNum] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);

    fetch(
      "https://www.random.org/integers/?num=1&min=1&max=100&col=1&base=10&format=plain&rnd=new"
    )
      .then((response) => {
        console.log("response", response)
        if (response.status !== 200) {
          return {
            error: `Something went wrong. Try again.`,
          };
        }
        return response.text();
      })
      .then((random) => {
        setLoading(false);

        if (isNaN(Number(random))) {
          const errorResponse = JSON.parse(random);
          setError(errorResponse.error);
        } else {
          setNum(random);
        }
      });
  }, [key]);

  if (error) return <p>{error}</p>;

  return (
    <Container>
      <button onClick={forceUpdate} className="btn">
        Random number: {loading ? "..." : num}
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
