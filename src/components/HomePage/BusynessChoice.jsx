import React, { useEffect, useState } from 'react';
const BusynessChoice = ({onDataUpdate}) => {

    const busynessLevels = ["Quiet", "Average", "Busy"]
    const [selectionMatrix, setSelctionMatrix] = useState(Array(busynessLevels.length).fill(0)); 

    const handleClick = (index) => {
        const SM2 = selectionMatrix.map((item, idx) =>
            idx===index ? (item === 0 ? 1 : 0) : item
        );
        setSelctionMatrix(SM2);
    }

    useEffect(()=>{
        onDataUpdate(selectionMatrix);
    }, [selectionMatrix]);

    return (
        <div className='mx-2 flex flex-col'>

            {Array.from({ length: busynessLevels.length }, (_,index) => (
                 
                <button 
                    key={index}
                    className={`
                        text-sm
                        w-[80px]
                        py-2
                        px-2     
                        m-1                   
                        text-white-600
                        ${selectionMatrix[index] === 0 ? 'hover:text-orange-600 border' : 'bg-white text-orange-600' }
                        rounded-md
                        hover:scale-105 active:scale-100
                    `
                    }
                    onClick={() => handleClick(index)}    
                >
                    {busynessLevels[index]}
                </button>
                      
            
            ))}
    
        </div>
    )
}

export default BusynessChoice