
// import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// import Swal from 'sweetalert2';
// import { useForm } from "react-hook-form";
// import { Link } from "react-router-dom";
// import { ShowMessage } from "../../components/templates/messagesTemplate";
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useUserStore } from '../../Store/UserStore';

// export const ProductForm = ({ onSubmit }) => {
//   const { userAuth } = useUserStore();
//   const { register, handleSubmit, formState: { errors }, reset } = useForm();
//   const [selectedFile, setSelectedFile] = useState(null);

//   // Asume que estos mensajes muestran mensajes de error específicos para cada campo
//   const { nombreProducto, categoriaProducto, costoProducto, descripcionProducto } = ShowMessage();

//   // Función para verificar si el usuario está autenticado
//   const isLogged = () => {
//     if (!userAuth) {
//       return (
//         <div className="login-center">
//           <h3>Inicia sesión para publicar un producto</h3>
//           <Link to='/login'>
//             <Button type="submit">Iniciar Sesión</Button>
//           </Link>
//         </div>
//       );
//     } else {
//       return (<Button type="submit">Publicar Producto</Button>);
//     }
//   };
//   useEffect(() => {
//     if (error) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: error
//       });
//       clearError();
//     }
//   }, [error, clearError]);

//   // Función para manejar la subida de archivos a Cloudinary
//   const handleFileChange = (event) => {
//     setSelectedFile(event.target.files[0]);
//   };

//   const uploadToCloudinary = async (file) => {
//     const cloudinaryForm = new FormData();
//     cloudinaryForm.append("file", file);
//     cloudinaryForm.append("upload_preset", "images");

//     const cloudinaryResponse = await fetch('https://api.cloudinary.com/v1_1/dwr4vjuo7/image/upload', {
//       method: 'POST',
//       body: cloudinaryForm,
//     });

//     const cloudinaryData = await cloudinaryResponse.json();
//     return cloudinaryData.secure_url;
//   };

//   // Función para validar la categoría del producto
//   const validateCategory = (value) => {
//     const allowedCategories = ["Books", "Electronic Devices", "Lab Equipment", "Stationery"];
//     return allowedCategories.includes(value) || "Categoría inválida. Por favor utiliza otra categoría.";
//   };

//   // Función para manejar el envío del formulario
//   const submitForm = async (data) => {
//     let cloudinaryURL = '';

//     if (selectedFile) {
//       try {
//         cloudinaryURL = await uploadToCloudinary(selectedFile);
//       } catch (error) {
//         console.error('Error al subir imagen:', error);
//         Swal.fire('Error', 'No se pudo subir la imagen. Inténtalo de nuevo.', 'error');
//         return;
//       }
//     }

//     data = {
//       ...data,
//       userId: userAuth.id,
//       photo: cloudinaryURL || '',
//       cost: parseFloat(data.cost)
//     };

//     // Aquí iría el código para enviar `data` al servidor o manejarlo según `onSubmit`
//     // Simulamos una respuesta exitosa del servidor
//     Swal.fire({
//       position: "center",
//       icon: "success",
//       title: "Tu producto ha sido agregado correctamente.",
//       showConfirmButton: false,
//       timer: 1500
//     }).then(() => {
//       reset(); // Limpia el formulario después de la confirmación
//     });
//   };

//   return (
//     <Container>
//      <ToastContainer /> 
//     <form className="form" onSubmit={handleSubmit(submitForm)}>

//         <h1 className="h1">Publicar Producto.</h1>
//         {/* <div className="input_container">
//           <label className="label" htmlFor="userId">User ID</label>
//           <input className={userAuth ? "input" : "inputDisabled"} id="userId" {...register("userId", { required: true })} placeholder="User ID" />
//           {errors.userId && userId()}

//         </div> */}

//         <div className="input_container">
//           <label className="label" htmlFor="name">Nombre</label>
//           <input className={userAuth ? "input" : "inputDisabled"} id="name" {...register("name", { required: true, minLength: 2, maxLength: 20 })} placeholder="Nombre del producto" />

//           {errors.name && nombreProducto()}

//         </div>

//         <div className="input_container">
//           <label className="label" htmlFor="category">Categoría</label>
//           <select className={userAuth ? "select" : "selectDisabled"} id="category" {...register("category", { required: "La categoría es requerida.", validate: validateCategory })} placeholder="Categoría">
//             <option value="">Selecciona una categoría</option>
//             <option value="Books">Books</option>
//             <option value="Electronic Devices">Electronic Devices</option>
//             <option value="Lab Equipment">Lab Equipment</option>
//             <option value="Stationery">Stationery</option>
//           </select>
//           {errors.category && categoriaProducto()}
//         </div>

//         <div className="input_container">
//           <label className="label" htmlFor="cost">Costo</label>
//           <input className={userAuth ? "input" : "inputDisabled"} type="number" id="cost" {...register("cost", { required: true, min: { value: 0.01, message: "El costo debe ser mayor a cero." } })} placeholder="Costo" />
//           {errors.cost && costoProducto() }
//         </div>

//         <div className="input_container">
//           <label className="label" htmlFor="description">Descripción</label>
//           <textarea className={userAuth ? "textarea" : "textareaDisabled"} id="description" {...register("description", { required: true })} placeholder="Descripción" />
//           {errors.description && descripcionProducto()}
//         </div>

//         <div className="input_container"> 
//           <label className="label" htmlFor="photo">Imagen</label>
//           <input className={userAuth ? "file-input" : "file-inputDisabled"}
//             id="photo"
//             type="file"
//             accept="image/*"
//             onChange={handleFileChange}
//           />
//         </div>

//         {isLogged()}

//         <Link to='/'>
//           <Button type="submit"> Salir </Button>
//         </Link>
        
//     </form>
//     </Container>
//   );
// };

// export default ProductForm;
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Swal from 'sweetalert2';
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUserStore } from '../../Store/UserStore';
import { useCartStore } from '../../Store/CartStore';

export const ProductForm = ({ onSubmit }) => {
  const { userAuth } = useUserStore();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [selectedFile, setSelectedFile] = useState(null);

  // Obtiene el estado y las funciones para manejar los mensajes de la store
  const { error, successMessage, clearError, clearSuccessMessage } = useCartStore(state => ({
    error: state.error,
    successMessage: state.successMessage,
    clearError: state.clearError,
    clearSuccessMessage: state.clearSuccessMessage,
  }));

  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error,
      }).then(() => {
        clearError();
      });
    } else if (successMessage) {
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: successMessage,
      }).then(() => {
        clearSuccessMessage();
        reset(); // Opcional: Limpia el formulario después de un éxito
      });
    }
  }, [error, successMessage, clearError, clearSuccessMessage]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const uploadToCloudinary = async (file) => {
    const cloudinaryForm = new FormData();
    cloudinaryForm.append("file", file);
    cloudinaryForm.append("upload_preset", "images");

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/dwr4vjuo7/image/upload', {
        method: 'POST',
        body: cloudinaryForm,
      });
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error('Error al subir imagen:', error);
      throw new Error('Error al subir la imagen.');
    }
  };

  const submitForm = async (data) => {
    try {
      let cloudinaryURL = '';
      if (selectedFile) {
        cloudinaryURL = await uploadToCloudinary(selectedFile);
      }

      const finalData = {
        ...data,
        userId: userAuth.id,
        photo: cloudinaryURL || '',
        cost: parseFloat(data.cost)
      };

      // Aquí deberías realizar el envío de finalData a tu servidor
      console.log(finalData); // Simula el envío de datos

      // Simula una respuesta exitosa
      // useCartStore.setState({ successMessage: 'Tu producto ha sido agregado correctamente.' });
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Tu producto ha sido agregado correctamente.",
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        reset(); // Limpia el formulario después de la confirmación
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo procesar tu solicitud.',
      });
    }
  };

  return (
    <Container>
      <ToastContainer />
      <form className="form" onSubmit={handleSubmit(submitForm)}>
        <h1>Publicar Producto</h1>

        <div className="input_container">
          <label htmlFor="name">Nombre</label>
          <input id="name" {...register("name", { required: true, minLength: 2, maxLength: 20 })} placeholder="Nombre del producto" />
          {errors.name && <p>{errors.name.message}</p>}
        </div>

        <div className="input_container">
          <label htmlFor="category">Categoría</label>
          <select id="category" {...register("category", { required: "La categoría es requerida." })}>
            <option value="">Selecciona una categoría</option>
            <option value="Books">Libros</option>
            <option value="Electronic Devices">Dispositivos Electrónicos</option>
            <option value="Lab Equipment">Equipo de Laboratorio</option>
            <option value="Stationery">Papelería</option>
          </select>
          {errors.category && <p>{errors.category.message}</p>}
        </div>

        <div className="input_container">
          <label htmlFor="cost">Costo</label>
          <input type="number" id="cost" {...register("cost", { required: true })} placeholder="Costo" />
          {errors.cost && <p>{errors.cost.message}</p>}
        </div>

        <div className="input_container">
          <label htmlFor="description">Descripción</label>
          <textarea id="description" {...register("description", { required: true })} placeholder="Descripción del producto"></textarea>
          {errors.description && <p>{errors.description.message}</p>}
        </div>

        <div className="input_container">
          <label htmlFor="photo">Imagen</label>
          <input type="file" id="photo" accept="image/*" onChange={handleFileChange} />
        </div>

        {isLogged()}

        <Link to='/'>
          <Button type="button">Salir</Button>
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
  
  .input, .inputDisabled, .textareaDisabled {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    margin-bottom: 8px;
    min-width: 300px;
  }

  .textarea, .textareaDisabled{
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

  .inputDisabled, .file-inputDisabled, .selectDisabled, .textareaDisabled{
    opacity: 0.5;
    pointer-events: none;
  }

  .login-center{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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