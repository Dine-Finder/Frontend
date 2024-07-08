//src PerPageButton.jsx
import React from 'react';

const PerPageButton = ({buttonNumber, onClick, numberOfRestuarants}) => {
    const number=buttonNumber
    return (
        <button className={
            buttonNumber===numberOfRestuarants 
            ? "h-[4vh] w-[4vh] mt-1 ml-1 bg-light border-2 border-main font-bold float-right translate-y-[-4.5vh]" 
            : "h-[4vh] w-[4vh] mt-1 ml-1 bg-white hover:bg-yellowfade border-2 border-main font-bold float-right translate-y-[-4.5vh]"}
            onClick={onClick}
        > 
            {number}
        </button>
    )
}

export default PerPageButton