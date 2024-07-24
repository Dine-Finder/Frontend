import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useEffect, useState } from 'react';

function valuetext(value) {
  return `${value}°C`;
}

const RangeSlider = ( {min, max, step, onDataFromParent} ) => {
  const [radius, setRadius] = useState(min);

  const handleChange = (event) => {
    setRadius(event.target.value);
  };

  useEffect(()=>{
    onDataFromParent(radius)
  }, [radius])

  return (
      <div className='mx-2 flex flex-col items-center justify-center'>
        <label className="block text-sm font-medium text-white">Radius: {radius} miles</label>
        {/* <input
          type="range"
          value={radius}
          min={min}
          max={max}
          step={step}
          onChange={handleChange}
          className="range range-error range-xs"
        /> */}
      <Box sx={{ width: "100%" }}>
      <Slider
        type="range"
        value={radius}
        valueLabelDisplay="auto"
        shiftStep={30}
        step={step}
        onChange={handleChange}
        marks
        min={min}
        max={max}
      />
    </Box>
      </div>
  );
};

export default RangeSlider;
