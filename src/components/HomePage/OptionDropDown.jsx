import React from 'react';

const OptionDropDown = ({ label, data, value, onChange }) => {
    return (
        <div className='mt-1 mx-2 relative text-xs'>
            <select 
                className='
                    appearance-none
                    w-full
                    bg-gray-800
                    text-white
                    border-2 
                    border-orange-500 
                    rounded-md 
                    p-2
                    focus:outline-none 
                    focus:border-orange-600 
                    focus:ring-1 
                    focus:ring-orange-600
                '
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
                <option value="" disabled>Select {label}</option>
                {data.map((item, index) => (
                    <option key={index} value={item}>{item}</option>
                ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
                </svg>
            </div>
        </div>
    );
}

export default OptionDropDown;
