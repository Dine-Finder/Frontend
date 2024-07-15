import React from 'react';
import Button from '@mui/material/Button';

const ApplyButton = ({onClick}) => {
    return (
      <Button variant="contained" className='rounded-md'
        onClick={() => onClick()}> 
        <p className='text-main font-extrabold'>APPLY</p>
      </Button>
    )
}

export default ApplyButton