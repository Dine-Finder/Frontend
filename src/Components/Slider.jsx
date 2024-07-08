//src Slider.jsx
import React, { useState, useEffect } from 'react';

const Slider = ( {min, max, step, onDataFromParent} ) => {
  const [radius, setRadius] = useState(min);

  const handleChange = (event) => {
    setRadius(event.target.value);
  };

  useEffect(()=>{
    onDataFromParent(radius)
  }, [radius])

  return (
      <div className='mx-2'>
        <label className="block text-sm font-medium text-gray-700">Radius: {radius} miles</label>
        <input
          type="range"
          value={radius}
          min={min}
          max={max}
          step={step}
          onChange={handleChange}
          className="w-full cursor-pointer"
        />
      </div>
  );
};

export default Slider;
