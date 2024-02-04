
import React from "react";
import styles from "./ProductForm.module.css"
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link } from "react-router-dom";

export const ProductForm = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [selectedFile, setSelectedFile] = useState(null);

  const submitForm = async (data) => {
    
    if(typeof onSubmit === "function"){
      onSubmit
    }

    const BASE_URL = "https://pf-server-93lj.onrender.com"
    try {
      let cloudinaryURL = '';
  
      console.log(selectedFile);
      if (selectedFile) {
        cloudinaryURL = await uploadToCloudinary(selectedFile);
      }
  
      data = {
        ...data,
        photo: cloudinaryURL,
        cost: parseFloat(data.cost)
      };

      console.log(data);

      const response = await fetch(`${BASE_URL}/product`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
  
      // console.log(response);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const uploadToCloudinary = async (file) => {

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
    <form onSubmit={handleSubmit(submitForm)}>
      <div>
        <label className={styles.label} htmlFor="userId">User ID:</label>
        <input id="userId" {...register("userId", { required: true })} placeholder="User ID" />
        {errors.userId && <p>User ID es requerido.</p>}
      </div>

      <div>
        <label className={styles.label} htmlFor="name">Nombre del producto:</label>
        <input id="name" {...register("name", { required: true, minLength: 2, maxLength: 20 })} placeholder="Nombre del producto" />
        {errors.name && <p>El nombre del producto es requerido.</p>}
      </div>

      <div>
        <label className={styles.label} htmlFor="category">Categoría:</label>
        <select id="category" {...register("category", { required: "La categoría es requerida.", validate: validateCategory })} placeholder="Categoría">
          <option value="">Selecciona una categoría</option>
          <option value="Books">Books</option>
          <option value="Electronic Devices">Electronic Devices</option>
          <option value="Lab Equipment">Lab Equipment</option>
          <option value="Stationery">Stationery</option>
        </select>
        {errors.category && <p>La categoría es requerida.</p>}
      </div>

      <div>
        <label className={styles.label} htmlFor="cost">Costo:</label>
        <input type="number" id="cost" {...register("cost", { required: true, min: { value: 0.01, message: "El costo debe ser mayor a cero." } })} placeholder="Costo" />
        {errors.cost && <p>{errors.cost.message || 'Campo requerido'}</p>}
      </div>

      <div>
        <label className={styles.label} htmlFor="description">Descripción:</label>
        <textarea id="description" {...register("description", { required: true })} placeholder="Descripción" />
        {errors.description && <p>La descripción del producto es requerida.</p>}
      </div>

      <div>
        <label className={styles.label} htmlFor="photo">Fotografía URL:</label>
        <input
          id="photo"
          type="file"
          accept="image/*"
          // {...register("photo")}
          onChange={handleFileChange}
        />
      </div>

      {/* <div>
        <label className={styles.label} htmlFor="activeStatus">Activo Status:</label>
        <select  id="activeStatus" {...register("activeStatus", { required: true })}>
          <option value="true">Activo</option>
          <option value="false">Inactivo</option>
        </select>
        {errors.activeStatus && <p>Se requiere que estes activo en tu status.</p>}
      </div> */}

      <button type="submit">Crear Producto</button>
      <pre>
      <Link to="/">
        <button className="return-button">Return</button>
      </Link>
      </pre>
    </form>
  );
};

export default ProductForm;
