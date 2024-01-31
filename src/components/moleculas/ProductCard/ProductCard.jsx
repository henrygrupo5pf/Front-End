/* eslint-disable react/prop-types */
import styled from "styled-components";
export const ProductCard = ({ product }) => {
  return (
    <CardContainer>
      <div className="title">{product?.name}</div>
      <div className="imgContainer">
        {/* <img src="" alt="" /> */}
      </div>
      <div className="description">{product?.description}</div>
    </CardContainer>
  );
};



const CardContainer = styled.div`
  /* border: 1px solid red; */
  /* width: 400px; */
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  flex-direction: column;

  .title {
    font-weight: 700;
    border: 1px solid;
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .description {
    font-weight: 500;
    /* border: 1px solid; */
    width: 100%;
    display: flex;
    /* height: 50px; */
    padding: 8px 20px;
    border: 1px solid gray;
    /* justify-content: center; */
  }
  .imgContainer{
    height: 200px;
    width: 100%;
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
