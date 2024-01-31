/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import styled from "styled-components";

export const FirstComponent = () => {
  const [user, setUser] = useState("");
  return (
    <Container>
      <div className="containerInput">
        <label>Nombre </label>
        <input
          className="inputclass"
          type="text"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
      </div>
      <PruebaReposAndGists username={user} />
    </Container>
  );
};
const PruebaReposAndGists = ({ username }) => {
  const reposQuery = useQuery({
    queryKey: ["random", username],
    queryFn: () =>
      fetch(`https://api.github.com/users/${username}/repos`).then((res) =>
        res.json()
      ),
  });

//   const gistQuery = useQuery({
//     queryKey: ["random", username],
//     queryFn: () =>
//       fetch(`https://api.github.com/users/${username}/gists`).then((res) =>
//         res.json()
//       ),
//   });

  return (
    <div>
      <h2>Repos</h2>
      {reposQuery.isLoading && <p>Loading repos...</p>}
      {reposQuery.isError && (
        <p>Error loading repos: {reposQuery.error.message}</p>
      )}
      {/* {reposQuery?.data&& (
        <ul>
          {reposQuery?.data.map((repo) => (
            <li key={repo.id}>{repo.name}</li>
          ))}
        </ul>
      )} */}
    </div>
  );
};

export default PruebaReposAndGists;

const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  flex-direction: column;
  .inputclass {
    border-radius: 4px;
    border: none;
    height: 30px;
    border: 1px solid lightgray;
  }
  .containerInput {
    /* border: 1px solid red; */
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 20px;
  }
  .btn {
    padding: 8px 16px;
    border-radius: 4px;
    border: 1px solid #ccc;
    background-color: #fff;
    font-weight: 700;
  }
`;
