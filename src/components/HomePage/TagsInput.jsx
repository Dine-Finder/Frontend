import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

import { processAndSortRestaurants } from './Trie';

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

const TagsInput = ({ restaurant, onClick }) => {
    const [tags, setTags] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        const value = event.target.value;
        if (value.endsWith(',') && value.length > 1) {
            const newTag = value.slice(0, -1).trim();
            if (newTag && !tags.includes(newTag) && tags.length < 5) {
                setTags([...tags, newTag]);
                setInputValue('');
            }
        } else {
            setInputValue(value);
        }
    };

    const removeTag = (indexToRemove) => {
        const newTags = tags.filter((_, index) => index !== indexToRemove);
        setTags(newTags);
    };

    function take_input(tags, restaurant, onClick){
        const sortedData = processAndSortRestaurants(restaurant, tags);
        onClick(sortedData);
    }


    return (
        <div className='flex justify-between items-center p-2'>
            <div className="grow" style={{ display: 'flex', flexWrap: 'wrap', padding: '1px', border: '1px solid #ccc', borderRadius: '10px' }}>
                {tags.map((tag, index) => (
                    <div key={index} style={{ margin: '5px', padding: '3px', backgroundColor: '#1F2937', borderRadius: '8px', fontSize: '12px' }}>
                        {tag}
                        <button onClick={() => removeTag(index)} style={{ marginLeft: '10px', cursor: 'pointer' }}>×</button>
                    </div>
                ))}
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    style={{ flex: '1', border: 'none', outline: 'none', fontSize: '16px', padding: '5px', borderRadius: '10px' }}
                    placeholder="Add a tag..."
                />
            </div>
            <GradientButton
            variant="contained"
            style={{ borderRadius: '8px', marginRight: '8px', marginLeft: '8px', fontWeight: 'bold', color: 'your-color' }}
            onClick={() => take_input(tags, restaurant, onClick)}>
            APPLY
            </GradientButton>

        </div>
    );
};

export default TagsInput;
