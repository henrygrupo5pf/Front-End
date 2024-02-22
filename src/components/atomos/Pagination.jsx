import styled from 'styled-components';

export const Pagination = ({ numberPage, setNumberPage, totalPages }) => {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <Container>
      {pages.map((page) => (
        <Button key={page} onClick={() => setNumberPage(page)} active={page === numberPage}>
          {page}
        </Button>
      ))}
    </Container>
  );
};

  const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

  const Button = styled.button`
  background-color: ${(props) => (props.active ? '#4caf50' : 'transparent')};
  color: ${(props) => (props.active ? 'white' : '#4caf50')};
  padding: 10px 15px;
  border: ${(props) => (props.active ? 'none' : '1px solid #4caf50')};
  border-radius: 4px;
  cursor: pointer;
  margin: 2px;
`;
  
