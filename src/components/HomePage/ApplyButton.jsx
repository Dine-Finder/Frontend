import React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const GradientButton = styled(Button)({
  background: 'linear-gradient(to right, #fb923c, #9a3412)',
  borderRadius: '8px',
  marginRight: '8px',
  fontWeight: 'bold',
  color: 'white',
  '&:hover': {
    background: 'linear-gradient(to right, #ea580c, #fdba74)',
  },
});

const ApplyButton = ({onClick}) => {
    return (
      <GradientButton variant="contained" className='rounded-md hover:scale-110 active:scale-90'
        onClick={() => onClick()}> 
        APPLY
      </GradientButton>
    )
}

export default ApplyButton