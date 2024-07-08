//src BusynessChoice.jsx
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
        <div className='mx-2'>

            {Array.from({ length: busynessLevels.length }, (_,index) => (
                 
                <button 
                    key={index}
                    className={`
                        w-[80px] 
                        ${selectionMatrix[index] === 0 ? 'bg-grey hover:bg-white' : 'bg-light'}
                        text-black
                        border-[2px] 
                        border-black 
                        rounded
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