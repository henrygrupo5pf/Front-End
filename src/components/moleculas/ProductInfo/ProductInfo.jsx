import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2'

export const ProductInfo = ({ info }) => {
  const BASE_URL = "https://pf-server-93lj.onrender.com"

  const handleDelete = async () => {
    try {
      const response = await fetch(`${BASE_URL}/product/${info.id}`, {
      const response = await fetch(`${BASE_URL}/product/${info.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('Producto eliminado correctamente');
        Swal.fire({
          icon: "success",
          title: `Producto eliminado actualizando...`,
          showConfirmButton: false,
          timer: 2500
        });
        setTimeout(() => {

          window.location.reload();
        }, 2500);
  
      } else {
        console.error('Error al eliminar producto:', response.statusText);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error al eliminar el producto",
        });
      }
    } catch (error) {
      console.error('Error al realizar la solicitud DELETE:', error.message);
    }
  };


  return (
    <Container>
      <div className={info.activeStatus ? "id" : "id_inactive"}> {info.id}  </div>
      <div className="name"> {info.name} </div>
      <div className="description"> {info.description} </div>
      <Link to={`/dashboard/updateproduct/${info.id}`}>
        <Button>Editar</Button>
      </Link>
      <DeleteButton onClick={handleDelete}>Eliminar</DeleteButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: ${({ menuOpen }) => (menuOpen ? '50px' : '50px')};
  transition: height 0.3s ease;

  .id{
    width: 30px;
    height: 100%;
    font-size: 16px;
    background-color: #4caf50;
    color: #fff;
    border: none;
    border-radius-left: 5px;
    text-align: center;
  }

  .id_inactive{
    width: 30px;
    height: 100%;
    font-size: 16px;
    background-color: red;
    color: #fff;
    border: none;
    border-radius-left: 5px;
    text-align: center;
  }

  .name {
    width: 180px;
  }

  .description {
    width: 300px;
    height: 100%;
    overflow-y: scroll;
  }

  .menu {
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    background-color: #f0f0f0;
    z-index: 0;
  }

  

`;

const DeleteButton = styled.button`
  width: 150px;
  font-size: 16px;
  background-color: #ff0000; 
  color: #fff;
  border: none;
  border-top-left-radius: 5px; 
  text-align: center;
  height: 35px;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #cc0000; 
  }
`;

const Button = styled.button`
  width: 150px;
  font-size: 16px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius-left: 5px;
  text-align: center;
  height: 35px;
  border-radius: 5px;
  transition: background-color 0.3s ease;

&:hover {
  background-color: #45a049; 
  }
`;