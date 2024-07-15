import React from 'react';

const RankIcon = ({ranking}) => {
    return (
        <div className="
        w-[30px] 
        h-[30px]
        absolute
        bg-main 
        border-4 
        border-red-500
        rounded-full 
        inline-flex 
        justify-center 
        text-center 
        top-0
        left-0
        z-0
        "    
        > 
            <p className='text-white font-extrabold'>{ranking}</p>
        </div>
    )
}

export default RankIcon