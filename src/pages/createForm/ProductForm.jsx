
import React from "react";
import styled from "styled-components"
import Swal from 'sweetalert2'
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ShowMessage } from "../../components/templates/messagesTemplate";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ProductForm = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [selectedFile, setSelectedFile] = useState(null);

  const { userId, nombreProducto, categoriaProducto, costoProducto, descripcionProducto } = ShowMessage(); 

  const submitForm = async (data) => {
    
    if(typeof onSubmit === "function"){
      onSubmit
    }

    const BASE_URL = "https://pf-server-93lj.onrender.com"
    try {
      let cloudinaryURL = '';
  
      if (selectedFile) {
        cloudinaryURL = await uploadToCloudinary(selectedFile);
        //llama a la funcion que envia el archivo a cloudinary pasandole el archivo del estado como parametro
        //cloudinaryURL pasa a ser la URL de la imagen
      }
  
      data = {
        ...data,
        photo: cloudinaryURL,
        cost: parseFloat(data.cost)
      };
      //Añade la URL de la imagen al objeto data
      //Parsea el cost de string a float

      // console.log(data);

      const response = await fetch(`${BASE_URL}/product`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (response.ok) {
        Swal.fire({
          position: "bottom",
          icon: "success",
          title: "Su producto ha sido agregado correctamente.",
          showConfirmButton: false,
          timer: 1500
        });
        reset();
        console.log('Formulario enviado con éxito');
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error interno. Inténtalo más tarde ",
        });
        // console.error('Error en la respuesta del servidor:', response);
      }
      //Envia el data como body al servidor
  
  
      // console.log(response);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleFileChange = (event) => {
    //Selecciona el Archivo subido en el input y lo guarda en el estado
    setSelectedFile(event.target.files[0]);
  };

  const uploadToCloudinary = async (file) => {
    //Toma file, el cual es un archivo y lo envia a cloudinary
    const cloudinaryForm = new FormData()
    cloudinaryForm.append("file", file)
    cloudinaryForm.append("upload_preset", "images")

    const cloudinaryResponse = await fetch('https://api.cloudinary.com/v1_1/dwr4vjuo7/image/upload', {
      method: 'POST',
      body: cloudinaryForm,
    });

    const cloudinaryData = await cloudinaryResponse.json();

    return cloudinaryData.secure_url;
  };

  const validateCategory = (value) => {
    const allowedCategories = ["Books", "Electronic Devices", "Lab Equipment", "Stationery"];
    return allowedCategories.includes(value) || "Categoría inválida. Por favor utiliza otra categoría.";
  };

  return (
    <Container>
     <ToastContainer /> 
    <form className="form" onSubmit={handleSubmit(submitForm)}>

        <h1 className="h1">Publicar Producto.</h1>
        <div className="input_container">
          <label className="label" htmlFor="userId">User ID</label>
          <input className="input" id="userId" {...register("userId", { required: true })} placeholder="User ID" />
          {errors.userId && userId()}

        </div>

        <div className="input_container">
          <label className="label" htmlFor="name">Nombre</label>
          <input className="input" id="name" {...register("name", { required: true, minLength: 2, maxLength: 20 })} placeholder="Nombre del producto" />

          {errors.name && nombreProducto()}

        </div>

        <div className="input_container">
          <label className="label" htmlFor="category">Categoría</label>
          <select className="select" id="category" {...register("category", { required: "La categoría es requerida.", validate: validateCategory })} placeholder="Categoría">
            <option value="">Selecciona una categoría</option>
            <option value="Books">Books</option>
            <option value="Electronic Devices">Electronic Devices</option>
            <option value="Lab Equipment">Lab Equipment</option>
            <option value="Stationery">Stationery</option>
          </select>
          {errors.category && categoriaProducto()}
        </div>

        <div className="input_container">
          <label className="label" htmlFor="cost">Costo</label>
          <input className="input" type="number" id="cost" {...register("cost", { required: true, min: { value: 0.01, message: "El costo debe ser mayor a cero." } })} placeholder="Costo" />
          {errors.cost && costoProducto() }
        </div>

        <div className="input_container">
          <label className="label" htmlFor="description">Descripción</label>
          <textarea className="textarea" id="description" {...register("description", { required: true })} placeholder="Descripción" />
          {errors.description && descripcionProducto()}
        </div>

        <div className="input_container"> 
          <label className="label" htmlFor="photo">Imagen</label>
          <input className="file-input"
            id="photo"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        <Button type="submit"> Crear Producto </Button>

        <Link to='/'>
          <Button type="submit"> Salir </Button>
        </Link>
        
    </form>
    </Container>
  );
};

export default ProductForm;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  
  .h1{
    margin-bottom: 30px;
  }

  .form{
    background-color: white;
    width: 500px;
    height: 600px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    box-shadow: 5px 10px 17px black;
    border-radius: 10px;
  }

  .input_container{
    display:flex;
    width: 90%;
  }

  .label {
    font-weight: bold;
    margin-bottom: 8px;
    min-width: 120px
  }
  
  .input, .textarea {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    margin-bottom: 8px;
    min-width: 300px;
  }

  .textarea{
    resize: none;
    max-width: 300px;
  }

  .input:focus{
    border-color: #66afe9;
  }

  .select {
    appearance: none;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    margin-bottom: 8px;
    min-width: 300px;
    cursor: pointer;
    background-color: #fff;
  }
  
  .select:focus {
    border-color: #66afe9; /* Cambiar color de borde al hacer hover */
  }
  
  .select option:first-child {
    color: #a0a0a0; /* Color para el texto de la opción de "Selecciona una categoría" */
  }
  
  .select option:hover {
    background-color: #f0f0f0; /* Cambiar color de fondo al hacer hover en las opciones */
  }

  .file-input {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    margin-bottom: 8px;
    min-width: 300px;
    cursor: pointer;
  }
  
  .file-input:hover {
    border-color: #66afe9; /* Cambiar color del borde al hacer hover */
  }
  
`

const Button = styled.button`
background-color: #4caf50;
color: white;
padding: 10px 15px;
border: none;
border-radius: 4px;
cursor: pointer;
font-size: 21px;
margin: 2px;
`;