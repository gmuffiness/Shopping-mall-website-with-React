import React from "react";
import './App.css';

const Pagination = ({ productsPerPage, totalProducts, paginate }) => {
  const pageNumber = [];
  
  // Math.ceil: 올림
  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumber.push(i);
  }

  return (
    <ul className="my-way">
      {pageNumber.map((pageNum) => (
        <li
          key={pageNum}
          className="my-way"
          onClick={() => paginate(pageNum)}
        >
          <a>{pageNum}</a>
        </li>
      ))}
    </ul>
    
  );
};

export default Pagination;