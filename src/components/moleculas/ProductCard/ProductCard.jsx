/* eslint-disable react/prop-types */
import styled from "styled-components";
import { Link } from "react-router-dom";
export const ProductCard = ({ product }) => {

  const havePhoto = () => {
    if(product.photo.includes("https")){
      return(
        <img className="imgClass" src={product.photo} alt="" />
      )
    }else{
      return(
        <img className="imgClass" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBMo0fDVD7zUjGjTFUui-TwOvlZ4ADpEfgbKYclMG6xA&s" alt="" />
      )
    }
  }
  
  return (
    <CardContainer>
      <Link className="link" to={`/productDetail/${product.id}`}>
        <div className="imgContainer">
          {havePhoto()}
        </div>
        <div className="title">{product?.name}</div>
        <div className="description">${product?.cost}/Dia</div>
      </Link>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  border: 2px solid grey;
  width: 270px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  flex-direction: column;
  box-shadow: 5px 10px 17px black;
  overflow: hidden;
  transition: background-color 0.5s ease, transform 0.3s ease;

  &:hover {
    box-shadow: 5px 6px 15px white;
    transform: scale(1.05);
  }

  .link{
    text-decoration: none;
    width: 100%;
    color: inherit;
  }

  .title {
    background-color: white;
    font-weight: 700;
    border: 1px solid grey;
    width: 100%;
    display: flex;
    justify-content: center;
    text-transform: uppercase;
    padding: 10px;
  }

  .description {
    background-color: white;
    font-weight: 800;
    font-size: 22px;
    /* border: 1px solid; */
    width: 100%;
    display: flex;
    justify-content: center;
    /* height: 50px; */
    padding: 8px 20px;
    border: 1px solid gray;
    /* justify-content: center; */
  }
  .imgContainer {
    padding: 1px ;
    height: 230px;
    width: 100%;
  }

  .imgClass {
    width: 100%;
    height: 230px;
  }
`;

// [
//     {
//         "id": 1,
//         "userId": 2,
//         "name": "Overall",
//         "category": "Lab Equipment",
//         "cost": "70",
//         "description": "Overall para laboratorio",
//         "photo": "Link de foto",
//         "activeStatus": true
//     },
//     {
//         "id": 2,
//         "userId": 1,
//         "name": "Bata",
//         "category": "Lab Equipment",
//         "cost": "50",
//         "description": "Bata para laboratorio",
//         "photo": "Link de foto",
//         "activeStatus": true
//     }
// ]
