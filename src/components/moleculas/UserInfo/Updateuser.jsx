import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';

export const Updateuser = () => {
  const TEST_URL = "http://localhost:3001/user";
  const BASE_URL = "https://pf-server-93lj.onrender.com"
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [userSubmited, setUserSubmited] = useState(false)


  /////////////////////////////////////
  /////////////////////////////////////
  /////////////////////////////////////
  /////////////////////////////////////
  /////////////////////////////////////
  //FALTAN LAS VALIDACIONES DE CADA CAMPO
  /////////////////////////////////////
  /////////////////////////////////////
  /////////////////////////////////////
  /////////////////////////////////////
  /////////////////////////////////////

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${BASE_URL}/user/${id}`);
        if (!response.ok) {
          throw new Error(`Something went wrong. Try again. Código de error: ${response.status}`);
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [id]);

  const handleInputChange = (fieldName, value) => {
    setUserData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      const submitFetch = await fetch(`${BASE_URL}/user/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      if (!submitFetch.ok) {
        throw new Error(`Something went wrong. Try again. Código de error: ${submitFetch.status}`);
      }

    } catch (error) {
      console.error(error);
    }

    setUserSubmited(true)
  };

  return (
    <Container>
      <>Modificacion de usuarios</>
      {!userData ? (
        "Loading"
      ) : (<><Link className="Link" to="/dashboard">
        <Button> Back</Button>
      </Link>
        <form onSubmit={handleOnSubmit}>
        <div className="input_container">
        <label>
            ID:
            </label>
            <input
              type="text"
              value={userData.id}
              readOnly
            />
        </div>
          
          <div className="input_container">
          <label>
            Name:
            </label>
            <input
              type="text"
              value={userData.name}
              placeholder="Name"
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </div>
          
          <div className="input_container">
          <label>
            Email:
            </label>
            <input
              type="text"
              value={userData.email}
              placeholder="Email"
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
          </div>
          
          <div className="input_container">
            <label>
              Active Status:
              </label>
              <select
                value={userData.activeStatus}
                onChange={(e) => handleInputChange("activeStatus", e.target.value)}
              >
                <option value={true}>True</option>
                <option value={false}>False</option>
              </select>
        </div>
          
          <div className="input_container">
          <label>
            Country:
            </label>
            <input
              type="text"
              value={userData.country}
              placeholder="Country"
              onChange={(e) => handleInputChange("country", e.target.value)}
            />
          </div>
          
          <div className="input_container">
            <label>
              Admin:
              </label>
              <select
                value={userData.admin}
                onChange={(e) => handleInputChange("admin", e.target.value)}
              >
                <option value={true}>True</option>
                <option value={false}>False</option>
              </select>
        </div>
          
          <div className="input_container">
          <label>
            Location:
            </label>
            <input
              type="text"
              value={userData.location}
              placeholder="Location"
              onChange={(e) => handleInputChange("location", e.target.value)}
            />
          </div>
          
          <div className="input_container">
          <label>
            Password:
            </label>
            <input
              type="text"
              value={userData.password}
              placeholder="Password"
              onChange={(e) => handleInputChange("password", e.target.value)}
            />
          </div>
          
          

          <button> Submit</button>
        </form>

        {userSubmited && <p>Usuario actualizado</p>}
      </>
      )}
    </Container>
  );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;

    .Link{
      text-decoration: none;
    }
    form{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 520px;
      height: 600px;
      background-color: white;
      box-shadow: 5px 10px 17px black;
      border-radius: 10px;
    }

    .input_container{
      display:flex;
      align-items: center;
      justify-content: center;
      width: 100%;
    }
  
    label {
      font-weight: bold;
      margin-bottom: 8px;
      min-width: 150px
    }
    
    input {
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box;
      margin-bottom: 20px;
      min-width: 280px;
    }
  
    input:focus{
      border-color: #66afe9;
    }
  
    select {
      appearance: none;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box;
      margin-bottom: 20px;
      min-width: 280px;
      cursor: pointer;
      background-color: #fff;
    }
    
    select:focus {
      border-color: #66afe9; /* Cambiar color de borde al hacer hover */
    }
    
    select option:first-child {
      color: #a0a0a0; /* Color para el texto de la opción de "Selecciona una categoría" */
    }
    
    select option:hover {
      background-color: #f0f0f0; /* Cambiar color de fondo al hacer hover en las opciones */
    }
`

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
  width: 250px;
  text-align:center;


&:hover {
  background-color: #45a049; 
  }
`;