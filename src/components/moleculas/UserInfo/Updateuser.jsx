import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';

export const Updateuser = () => {
  const TEST_URL = "http://localhost:3001/user";
  const BASE_URL = "https://pf-server-93lj.onrender.com"
  const { id } = useParams();
  const [userData, setUserData] = useState("");
  const [userSubmited, setUserSubmited] = useState(false)
  const [error, setError] = useState({
    result: false,
    message: ""
  })


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

  const validateName = (value) => {
    return /^[A-Za-z0-9\s]+$/.test(value)
  }

  const validateEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  }

  const validatePassword = (value) => {
    return /^(?=.*[A-Za-z])(?=.*\d).{6,20}$/.test(value)
  }

  const validatePhoneNumber = (value) => {
    return /^\d{9,15}$/.test(value)
  };




  const handleInputChange = (fieldName, value) => {
    setUserData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }))
    if (fieldName === "name") {
      value === "" ? setError({ result: false }) : validateName(value) ? setError({ result: false }) : setError(
        {
          result: true,
          message: "° Name must be a alfanumeric combination"
        })
    }
    if (fieldName === "email") {
      value === "" ? setError({ result: false }) : validateEmail(value) ? setError({ result: false }) : setError(
        {
          result: true,
          message: "° Email format is wrong. Please change it"
        })
    }
    if (fieldName === "password") {
      value === "" ? setError({ result: false }) : validatePassword(value) ? setError({ result: false }) : setError(
        {
          result: true,
          message: "° Password must be a alphanumeric combination and needs to be a between 6 and 20 characters  "
        })
    }
    if (fieldName === "phoneNumber") {
      value === "" ? setError({ result: false }) : validatePhoneNumber(value) ? setError({ result: false }) : setError(
        {
          result: true,
          message: "° Phone Number must be numeric combination and needs to be between 9 and 15 characters  "
        })
    }
  };



  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if(!error){ try {
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

      setUserSubmited(true)
      return 0
    } catch (error) {
      console.error(error);
    }}
    else return console.log("ERROR EN LA LOGICA");
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

          <div className="input_container">
            <label>Phone Number:</label>
            <input
              type="text"
              placeholder="Phone Number"
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
            />

          </div>

          <Button> Submit</Button>
        </form>

        <ErrorBox>
          {error.message}
        </ErrorBox>


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

const ErrorBox = styled.div`
  background-color: #ff9999;
  color: #990000;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
  width: 300px;
  align-self: flex-end;
`;