import React from 'react';

const PerPageButton = ({buttonNumber, onClick, numberOfRestuarants}) => {
    const number=buttonNumber
    return (
        <button className={
            buttonNumber===numberOfRestuarants 
            ? "h-8 w-8 mt-1 ml-1 bg-orange-500 text-white border-2 border-orange-500 font-bold rounded-md shadow-md float-right translate-y-[-4.5vh]" 
            : "h-8 w-8 mt-1 ml-1 bg-gray-800 hover:text-orange-500 text-white border-2 border-gray-600 font-bold rounded-md shadow-md float-right translate-y-[-4.5vh]"}
            onClick={onClick}
        > 
            {number}
        </button>
    )
}

export default PerPageButton