import React from 'react';

const PerPageButton = ({ buttonNumber, onClick, numberOfRestaurants }) => {
    const number = parseInt(buttonNumber, 10);
    const restaurantsCount = parseInt(numberOfRestaurants, 10);

    return (
        <button
            className={
                restaurantsCount === number
                    ? "h-8 w-8 mt-1 ml-1 bg-orange-500 text-white border-2 border-red-500 font-bold rounded-md shadow-md float-right translate-y-[-4.5vh]"
                    : "h-8 w-8 mt-1 ml-1 bg-gray-800 hover:text-orange-500 text-white border-2 border-gray-600 hover:border-red-600 font-bold rounded-md shadow-md float-right translate-y-[-4.5vh]"
            }
            onClick={onClick}
        >
            {number}
        </button>
    );
};

export default PerPageButton;
