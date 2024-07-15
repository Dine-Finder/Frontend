import React from 'react';

const PageButton = ({ pageNumber, buttonNumber, onClick }) => {
    return (
        <button 
            className={`h-8 w-8 mt-1 ml-1 text-white font-bold rounded-full z-10
                        transition duration-300 ease-in-out transform
                        ${buttonNumber === pageNumber 
                            ? "bg-orange-500 border-2 border-orange-700 shadow-md"
                            : "bg-gray-800 hover:text-orange-500 border-2 border-gray-700 hover:border-orange-500"}
                       `}
            onClick={onClick}
        >
            {buttonNumber}
        </button>
    );
}

export default PageButton;
