import { useState } from "react";
import { Link } from "react-router-dom";

export const Usercreate = () => {
  const TEST_URL = "http://localhost:3001/user"
  const [userForFetch, setUserForFetch] = useState(
    {
      name: "",
      email: "",
      activestatus: "",
      password: "",
      country: "",
      location: "",
      phoneNumber: "",
      admin: false
    }
  )


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
  

  const handleOnChange = (fieldName, value) => {
    setUserForFetch((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleOnSubmit = async () => {
    e.preventDefault();
    const userFetched = await fetch(`${TEST_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userForFetch),
    });
  };


  return (<>
<>Creacion de usuarios</>
    <Link to="/dashboard">
      <button> Back</button>
    </Link>
    <form onSubmit={handleOnSubmit}>
      <label>
        Name:
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => handleOnChange("name", e.target.value)}
        />
      </label>
      <label>
        Email:
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => handleOnChange("email", e.target.value)}
        />
      </label>
      <label>
        Active Status:
        <input
          type="text"
          placeholder="Active Status"
          onChange={(e) => handleOnChange("activestatus", e.target.value)}

        />
      </label>
      <label>
        Country:
        <input
          type="text"
          placeholder="country"
          onChange={(e) => handleOnChange("country", e.target.value)}
        />
      </label>
      <label>
        Admin:
        <input
          type="text"
          placeholder="Admin Status"
          onChange={(e) => handleOnChange("admin", e.target.value)}
        />
      </label>
      <label>
        Location:
        <input
          type="text"
          placeholder="Location"
          onChange={(e) => handleOnChange("location", e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="text"
          placeholder="Password"
          onChange={(e) => handleOnChange("password", e.target.value)}
        />
      </label>
      <label>
        Phone Number:
        <input
          type="text"
          placeholder="Phone Number"
          onChange={(e) => handleOnChange("phoneNumber", e.target.value)}
        />
      </label>
      <button>Submit</button>
    </form>
  </>

  )
};
