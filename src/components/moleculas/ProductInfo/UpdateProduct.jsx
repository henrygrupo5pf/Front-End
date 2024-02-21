import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const UpdateProduct = () => {
  const TEST_URL = "http://localhost:3001/user";
  const BASE_URL = "https://pf-server-93lj.onrender.com"
  const { id } = useParams();
  const [productData, setProductData] = useState(null);
  const [productSubmited, setProductSubmited] = useState(false)


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
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${BASE_URL}/product/${id}`);
        if (!response.ok) {
          throw new Error(`Something went wrong. Try again. Código de error: ${response.status}`);
        }
        const data = await response.json();
        setProductData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleInputChange = (fieldName, value) => {
    setProductData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      const submitFetch = await fetch(`${BASE_URL}/product/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
      if (!submitFetch.ok) {
        throw new Error(`Something went wrong. Try again. Código de error: ${submitFetch.status}`);
      }

    } catch (error) {
      console.error(error);
    }

    setProductSubmited(true)
  };

  return (
    <div>
      <>Modificacion de usuarios</>
      {!productData ? (
        "Loading"
      ) : (<><Link to="/dashboard">
        <button> Back</button>
      </Link>
        <form onSubmit={handleOnSubmit}>
          <label>
            ID:
            <input
              type="text"
              value={productData.id}
              readOnly
            />
          </label>
          <label>
            Name:
            <input
              type="text"
              value={productData.name}
              placeholder="Name"
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </label>
          <label>
            Description:
            <input
              type="text"
              value={productData.description}
              placeholder="Description"
              onChange={(e) => handleInputChange("description", e.target.value)}
            />
          </label>

          <label>
            Category:
            <input
              type="text"
              value={productData.category}
              placeholder="category"
              onChange={(e) => handleInputChange("category", e.target.value)}
            />
          </label>
          <label>
            Active Status:
            <input
              type="text"
              value={productData.activeStatus}
              placeholder="Active Status"
              onChange={(e) => handleInputChange("activeStatus", e.target.value)}
            />
          </label>
          <label>
            Cost:
            <input
              type="number"
              value={productData.cost}
              placeholder="Cost"
              onChange={(e) => handleInputChange("cost", e.target.value)}
            />
          </label>
          <label>
            Photo:
            <input
              type="text"
              value={productData.photo}
              placeholder="Photo"
              onChange={(e) => handleInputChange("photo", e.target.value)}
            />
          </label>

          <button> Submit</button>
        </form>

        {productSubmited && <p>Usuario actualizado</p>}
      </>
      )}
    </div>
  );
};
