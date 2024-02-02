import React from "react";
import styles from "./ProductForm.module.css"
import { useForm } from "react-hook-form";

export const ProductForm = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const submitForm = (data) => {
    if(typeof onSubmit === "function"){
      onSubmit
    }
    console.log(data)
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
        <input id="photo" {...register("photo")} placeholder="Fotografía URL" />
      </div>

      <div>
        <label className={styles.label} htmlFor="activeStatus">Activo Status:</label>
        <select  id="activeStatus" {...register("activeStatus", { required: true })}>
          <option value="true">Activo</option>
          <option value="false">Inactivo</option>
        </select>
        {errors.activeStatus && <p>Se requiere que estes activo en tu status.</p>}
      </div>

      <button type="submit">Crear Producto</button>
    </form>
  );
};

export default ProductForm;
