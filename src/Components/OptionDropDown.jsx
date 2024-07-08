//src OptionDropDown.jsx
import React from 'react';

const OptionDropDown = ({data, value, onChange}) => {
    return (
        <div className='mt-1 mx-2'>
            <select 
                className='border-[2px] border-main w-[100%]'
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
                <option value="" disabled>Select</option>
                {data.map((item,index)=>(
                    <option key={index} value={item}> {item}</option>
                    ))
                }
            </select>
        </div>
    )
}

export default OptionDropDown