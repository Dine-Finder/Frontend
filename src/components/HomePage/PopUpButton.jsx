import React, { useState } from 'react';

const PopUpButton = ({ onClick }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className='relative'>
            <button 
                className='absolute h-[30px] right-0 bottom-0 p-2 flex justify-center items-center'
                onClick={(e) => {
                    e.stopPropagation();
                    onClick(e);
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <i className="fa-solid fa-circle-info"></i>
            </button>
            {isHovered && (
                <div className="
                    absolute right-5 bottom-5 mb-2 p-2 
                    bg-black text-white 
                    text-xs rounded-md
                    whitespace-nowrap
                ">
                    More Info
                </div>
            )}
        </div>
    );
};

export default PopUpButton;
