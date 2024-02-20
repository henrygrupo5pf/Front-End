import { useState } from "react";
import { Link } from "react-router-dom";

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

  const handleOnChange = (fieldName, value) => {
    setUserForFetch((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      const userFetched = await fetch(`${BASE_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userForFetch),
      });
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
    }
  };

  return (
    <>
      <>Creacion de usuarios</>
      <Link to="/dashboard">
        <button> Back</button>
      </Link>
      <form onSubmit={handleOnSubmit}>
        <label>
          Country:
          <select
            value={userForFetch.country}
            onChange={(e) => handleOnChange("country", e.target.value)}
          >
            <option value="">Select Country</option>
            <option value="Country1">Country1</option>
            <option value="Country2">Country2</option>
            <option value="Country3">Country3</option>
          </select>
        </label>

        <label>
          Location:
          <select
            value={userForFetch.location}
            onChange={(e) => handleOnChange("location", e.target.value)}
          >
            <option value="">Select Location</option>
            <option value="Location1">Location1</option>
            <option value="Location2">Location2</option>
            <option value="Location3">Location3</option>
          </select>
        </label>

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
          <select
            value={userForFetch.activestatus}
            onChange={(e) => handleOnChange("activestatus", e.target.value)}
          >
            <option value={true}>True</option>
            <option value={false}>False</option>
          </select>
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

        <label>
          Admin:
          <select
            value={userForFetch.admin}
            onChange={(e) => handleOnChange("admin", e.target.value)}
          >
            <option value={false}>False</option>
            <option value={true}>True</option>
          </select>
        </label>

        <button>Submit</button>
      </form>
    </>
  );
};
