import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
      const submitFetch = await fetch(`${TEST_URL}/${id}`, {
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
    <div>
      <>Modificacion de usuarios</>
      {!userData ? (
        "Loading"
      ) : (<><Link to="/dashboard">
        <button> Back</button>
      </Link>
        <form onSubmit={handleOnSubmit}>
          <label>
            ID:
            <input
              type="text"
              value={userData.id}
              readOnly
            />
          </label>
          <label>
            Name:
            <input
              type="text"
              value={userData.name}
              placeholder="Name"
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </label>
          <label>
            Email:
            <input
              type="text"
              value={userData.email}
              placeholder="Email"
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
          </label>
          <label>
            Active Status:
            <input
              type="text"
              value={userData.activeStatus}
              placeholder="Active Status"
              onChange={(e) => handleInputChange("activeStatus", e.target.value)}
            />
          </label>
          <label>
            Country:
            <input
              type="text"
              value={userData.country}
              placeholder="Country"
              onChange={(e) => handleInputChange("country", e.target.value)}
            />
          </label>
          <label>
            Admin:
            <input
              type="text"
              value={userData.admin}
              placeholder="Admin"
              onChange={(e) => handleInputChange("admin", e.target.value)}
            />
          </label>
          <label>
            Location:
            <input
              type="text"
              value={userData.location}
              placeholder="Location"
              onChange={(e) => handleInputChange("location", e.target.value)}
            />
          </label>
          <label>
            Password:
            <input
              type="text"
              value={userData.password}
              placeholder="Password"
              onChange={(e) => handleInputChange("password", e.target.value)}
            />
          </label>

          <button> Submit</button>
        </form>

        {userSubmited && <p>Usuario actualizado</p>}
      </>
      )}
    </div>
  );
};
