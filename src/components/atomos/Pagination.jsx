import styled from 'styled-components';

const Pagination = ({ numberPage, setNumberPage, totalPages }) => {
    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  
    return (
      <Container>
        {pages.map((page) => (
          <Button key={page} onClick={() => setNumberPage(page)}>
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
  background-color: #4caf50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 2px;
`;
  
  export default Pagination;