import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';

export const UpdateProduct = () => {
  const TEST_URL = "http://localhost:3001/user";
  const BASE_URL = "https://pf-server-93lj.onrender.com"
  const { id } = useParams();
  const [productData, setProductData] = useState(null);
  const [productSubmited, setProductSubmited] = useState(false)
  const [notification, setNotification] = useState({
    type: "",
    message: "",
  });
  /////////////////////////////////////
  /////////////////////////////////////
  /////////////////////////////////////
  /////////////////////////////////////
  /////////////////////////////////////
  //FALTAN LAS VALIDACIONES DE CADA CAMPO
  //Y NOTIFICACIONES
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
        delete data.User
        delete data.userId
        setProductData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleInputChange = (fieldName, value) => {
    setNotification({ type: "", message: "" })
    setProductData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleOnSubmit = async (e) => {

    e.preventDefault();
    let aux = 0
    
    if (!validateName(productData.name) || !validateDescription(productData.description) || !validateCost(productData.cost) || !validatePhoto(productData.photo)) {
      aux = 1
    }
    if (aux === 1) {
      setNotification({ type: "error", message: "° Please check your input fields." })
      
      aux = 0
      
      return;
    }
    console.log("2:",notification);
    try {

      const submitFetch = await fetch(`${BASE_URL}/product/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...productData, cost: parseFloat(productData.cost) }),
      });
      if (!submitFetch.ok) {
        
        throw new Error(`Something went wrong. Try again. Código de error: ${submitFetch.status}`);
      }

    } catch (error) {
      console.error(error);
    }

    setProductSubmited(true)
  };

  const validateName = (name) => /^[a-zA-Z0-9]+$/.test(name);

  const validateDescription = (description) => /^[a-zA-Z0-9\s]{15,500}$/.test(description);

  const validateCost = (cost) => /^\d+(\.\d{1,2})?$/.test(cost) && parseFloat(cost) > 0;

  const validatePhoto = (photo) => /^(ftp|http|https):\/\/[^ "]+$/i.test(photo);




  return (
    <Container>
      <>Modificacion de usuarios</>
      {!productData ? (
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
              value={productData.id}
              readOnly
            />
          </div>

          <div className="input_container">
            <label>
              Name:
            </label>
            <input
              type="text"
              value={productData.name}
              placeholder="Name"
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </div>

          <div className="input_container">
            <label>
              Description:
            </label>
            <input
              type="text"
              value={productData.description}
              placeholder="Description"
              onChange={(e) => handleInputChange("description", e.target.value)}
            />
          </div>


          <div className="input_container">
            <label>
              Category:
            </label>
            <input
              type="text"
              value={productData.category}
              placeholder="category"
              onChange={(e) => handleInputChange("category", e.target.value)}
            />
          </div>

          <div className="input_container">
            <label>
              Active Status:
            </label>
            <select
              value={productData.activeStatus}
              onChange={(e) => handleInputChange("activeStatus", e.target.value)}
            >
              <option value={true}>True</option>
              <option value={false}>False</option>
            </select>
          </div>

          <div className="input_container">
            <label>
              Cost:
            </label>
            <input
              type="number"
              value={productData.cost}
              placeholder="Cost"
              onChange={(e) => handleInputChange("cost", e.target.value)}
            />
          </div>

          <div className="input_container">
            <label>
              Photo:
            </label>
            <input
              type="text"
              value={productData.photo}
              placeholder="Photo"
              onChange={(e) => handleInputChange("photo", e.target.value)}
            />
          </div>



          <Button> Submit</Button>
        </form>
        {notification.type === "error" && (
          <ErrorBox>
            {notification.message}
            {!validateName(productData.name) && <div>° Invalid format name. Only alphanumeric characters allowed.</div>}
            {!validateDescription(productData.description) && <div>° Description must be longer .</div>}
            {!validateCost(productData.cost) && <div>° Cost must be a number greater than 0</div>}
            {!validatePhoto(productData.photo) && <div>° Invalid format photo. Only alphanumeric characters allowed.</div>}
          </ErrorBox>
        )}
        {productSubmited && <p>Producto actualizado</p>}
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