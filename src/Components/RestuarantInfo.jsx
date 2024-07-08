//src RestuarantInfo.jsx
import React from 'react';

const RestuarantInfo = ({restuarant}) => {
  return (
    <div className="
        bg-transparent
        h-full
        w-2/3
        relative
        inline-flex
        flex-col
        border-0
        border-main
        overflow-hidden
        z-4
        "
    > 
      <div className='
      absolute
      pl-2
      '>
        <div className='
          text-main
          font-bold
          text-lg
          overflow-none
          '>
            {restuarant.name}
        </div>
        <p className=''>{restuarant['location']['address1']}</p>
        <p className=''>Busyness: </p>
        <p className=''>Price Range: {restuarant['price']}</p>
      </div>
    </div>
  )
}

export default RestuarantInfo