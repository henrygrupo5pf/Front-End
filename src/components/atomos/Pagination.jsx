const Pagination = ({ numberPage, setNumberPage, totalPages }) => {
    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  
    return (
      <div>
        {pages.map((page) => (
          <button key={page} onClick={() => setNumberPage(page)}>
            {page}
          </button>
        ))}
      </div>
    );
  };
  
  export default Pagination;