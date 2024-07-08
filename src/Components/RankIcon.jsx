//src RankIcon.jsx
import React from 'react';

const RankIcon = ({ranking}) => {
    return (
        <div className="
        w-[30px] 
        h-[30px]
        absolute
        bg-yellow 
        text-main 
        border-2 
        border-main 
        rounded-full 
        inline-flex 
        justify-center 
        items-center 
        text-lg 
        font-bold 
        text-center 
        top-0
        left-0
        z-0
        "    
        > 
            <p className='text-main font-extrabold'>{ranking}</p>
        </div>
    )
}

export default RankIcon