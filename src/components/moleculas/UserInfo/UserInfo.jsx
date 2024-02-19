import styled from 'styled-components';

export const UsersInfo = ({ info }) => {

  return (
    <Container>
      <div className="id"> {info.id}  </div>
      <div className="name"> {info.name} </div>
      <div className="email"> {info.email} </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  .id{
    width: 40px;
    font-size: 16px;
    background-color: #4caf50; 
    color: #fff;
    border: none;
    border-radius-left: 5px;
    text-align: center;
  }
`