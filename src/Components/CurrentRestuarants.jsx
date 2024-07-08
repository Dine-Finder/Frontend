//src CurrentRestuarants.jsx
import React from 'react';

const CurrentRestuarants = ({numberOfBusinesses}) => {
    return (
        <div className="
        m-[2%]
        
        w-[96%]  
        bg-white
        border-2 
        border-main 
        rounded
        font-bold 
        z-10
        text-center
        "    
        > 
            <p className=''>Current Filters:</p>
            {numberOfBusinesses>99 
            ?<p className='font-bold'>99+ Restaurants</p>
            : <p className='font-bold text-2xl'>{numberOfBusinesses} Restaurants</p>}

        </div>
    )
}

export default CurrentRestuarants