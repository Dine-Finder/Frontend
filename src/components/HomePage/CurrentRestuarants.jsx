import React from 'react';

const CurrentRestuarants = ({numberOfBusinesses}) => {
    return (
        <div className="
        text-m text-orange-500
        w-[96%]
        border
        rounded-md
        py-3
        px-4
        m-3
        z-10
        text-center
        "    
        > 
            <p className=''>Current Filters</p>
            {numberOfBusinesses>99 
            ?<p className='font-bold'>99+ Restaurants</p>
            : <p className='font-bold text-2xl'>{numberOfBusinesses} Restaurants</p>}
        </div>
    )
}

export default CurrentRestuarants