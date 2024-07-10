//src ApplyButton.jsx
import React from 'react';

const ApplyButton = ({onClick}) => {
    return (
        <button onClick={onClick} className="
        m-[2%]
        h-[26px]
        w-[96%]  
        bg-yellow 
        border-2 
        border-main 
        rounded
        font-bold 
        z-10
        "    
        > 
            <p className='text-main font-extrabold'>APPLY</p>
        </button>
    )
}

export default ApplyButton