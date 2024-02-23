import { useState } from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import appFirebase from '../../../credenciales';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';




///se elimina por el delete
const auth = getAuth(appFirebase);

export const Usercreate = () => {
  const BASE_URL = "https://pf-server-93lj.onrender.com";

  const [userForFetch, setUserForFetch] = useState({
    name: "",
    email: "",
    activestatus: true,
    password: "",
    country: "",
    location: "",
    phoneNumber: "",
    admin: false,
  });

  const [notification, setNotification] = useState({
    type: "",
    message: "",
  });

  const handleOnChange = (fieldName, value) => {
    setUserForFetch((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {


      const userFetched = await fetch(`${BASE_URL}/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userForFetch),
      });

      createUserWithEmailAndPassword(auth, userForFetch.email, userForFetch.password);

      setNotification({ type: "success", message: "User created successfully." });
      console.log(userForFetch);
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      setNotification({ type: "error", message: "Error creating user. Please try again." });
    }
  };



  return (
    <Container>
      <div>Creacion de usuarios</div>
      <Link className="Link" to="/dashboard">
        <Button>Back</Button>
      </Link>
      <form onSubmit={handleOnSubmit}>
        <div className="input_container">
          <label>Country:</label>
          <select
            value={userForFetch.country}
            onChange={(e) => handleOnChange("country", e.target.value)}
          >
            <option value="">Select Country</option>
            <option value="Country1">Country1</option>
            <option value="Country2">Country2</option>
            <option value="Country3">Country3</option>
          </select>
        </div>

        <div className="input_container">
          <label>Location:</label>
          <select
            value={userForFetch.location}
            onChange={(e) => handleOnChange("location", e.target.value)}
          >
            <option value="">Select Location</option>
            <option value="Location1">Location1</option>
            <option value="Location2">Location2</option>
            <option value="Location3">Location3</option>
          </select>
        </div>

        <div className="input_container">
          <label>Name:</label>
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => handleOnChange("name", e.target.value)}
          />

        </div>

        <div className="input_container">
          <label>Email:</label>
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => handleOnChange("email", e.target.value)}
          />

        </div>

        <div className="input_container">
          <label>Active Status:</label>
          <select
            value={userForFetch.activestatus}
            onChange={(e) => handleOnChange("activestatus", e.target.value)}
          >
            <option value={true}>True</option>
            <option value={false}>False</option>
          </select>
        </div>

        <div className="input_container">
          <label>Password:</label>
          <input
            type="text"
            placeholder="Password"
            onChange={(e) => handleOnChange("password", e.target.value)}
          />

        </div>

        <div className="input_container">
          <label>Phone Number:</label>
          <input
            type="text"
            placeholder="Phone Number"
            onChange={(e) => handleOnChange("phoneNumber", e.target.value)}
          />

        </div>

        <div className="input_container">
          <label>Admin:</label>
          <select
            value={userForFetch.admin}
            onChange={(e) => handleOnChange("admin", e.target.value)}
          >
            <option value={false}>False</option>
            <option value={true}>True</option>
          </select>
        </div>

        <Button type="submit">Submit</Button>
      </form>
   
  
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
      border-color: #66afe9; 
    }
    
    select option:first-child {
      color: #a0a0a0; 
    }
    
    select option:hover {
      background-color: #f0f0f0; 
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