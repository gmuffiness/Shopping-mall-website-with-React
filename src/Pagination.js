import React from "react";

const Pagination = ({ productsPerPage, totalProducts, paginate }) => {
  const pageNumber = [];
  
  // Math.ceil: 올림
  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumber.push(i);
  }

  return (
    <ul className="pagination">
      {pageNumber.map((pageNum) => (
        <li
          key={pageNum}
          className="pagination_item"
          onClick={() => paginate(pageNum)}
        >
          {pageNum}
        </li>
      ))}
    </ul>
  );
};

export default Pagination;