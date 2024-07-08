//src PageButton.jsx
import React from 'react';

const PageButton = ({pageNumber, buttonNumber, onClick}) => {
    const number=buttonNumber
    return (
        <button className={buttonNumber===pageNumber 
            ? "h-[4vh] w-[4vh] mt-1 ml-1 bg-light border-2 border-main rounded-full font-bold z-10"
            : "h-[4vh] w-[4vh] mt-1 ml-1 bg-white hover:bg-yellowfade border-2 border-main rounded-full font-bold z-10"
            }
            onClick={onClick}
        > 
            {number}
        </button>
    )
}

export default PageButton