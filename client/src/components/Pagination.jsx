import React from "react";

const Pagination = ({ productsPerPage, totalProducts, paginate, currentPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < pageNumbers.length) {
      paginate(currentPage + 1);
    }
  };

  return (
    <nav aria-label="Page navigation example" className="mt-6">
      <ul className="inline-flex items-center -space-x-px">
        {/* Previous Button */}
        <li>
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className={`block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <span className="sr-only">Previous</span>
            &larr;
          </button>
        </li>

        {/* Page Numbers */}
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className={`px-3 py-2 leading-tight border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${
                number === currentPage
                  ? "bg-blue-800 text-white"
                  : "text-gray-500 bg-white dark:bg-gray-800 dark:text-gray-400"
              }`}
            >
              {number}
            </button>
          </li>
        ))}

        {/* Next Button */}
        <li>
          <button
            onClick={handleNext}
            disabled={currentPage === pageNumbers.length}
            className={`block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 ${
              currentPage === pageNumbers.length ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <span className="sr-only">Next</span>
            &rarr;
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
