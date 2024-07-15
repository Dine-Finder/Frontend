import React from 'react';

const PopUp = ({onClick}) => {
  return (
    <div className= 'fixed h-screen w-screen z-50 bg-black bg-opacity-50'>
        <div className= 'mx-auto mt-[8vh] h-5/6 w-1/2 bg-white border-2 border-main'>
            <button 
                className='w-[25px] h-[25px] rounded-full bg-main text-white'
                onClick={(e)=>{
                    e.stopPropagation();
                    onClick(false);
                }}
            >
                X
            </button>

        </div>
    </div>
  )
}

export default PopUp