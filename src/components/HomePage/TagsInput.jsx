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
        setInputValue(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const newTag = inputValue.trim();
            if (newTag && !tags.includes(newTag) && tags.length < 8) {
                setTags([...tags, newTag]);
                setInputValue('');
            }
        }
    };

    const removeTag = (indexToRemove) => {
        const newTags = tags.filter((_, index) => index !== indexToRemove);
        setTags(newTags);
    };

    const takeInput = () => {
        const sortedData = processAndSortRestaurants(restaurant, tags);
        onClick(sortedData);
    };

    return (
        <div className='flex justify-between items-center p-2'>
            <div className="grow" style={{ display: 'flex', flexWrap: 'wrap', padding: '1px', border: '1px solid #ccc', borderRadius: '10px' }}>
                {tags.map((tag, index) => (
                    <div key={index} style={{ margin: '5px', padding: '3px', backgroundColor: '#1F2937', borderRadius: '8px', fontSize: '12px' }}>
                        {tag}
                        <button onClick={() => removeTag(index)} style={{ marginLeft: '10px', cursor: 'pointer' }}><i className="fa-solid fa-circle-xmark"></i></button>
                    </div>
                ))}
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    style={{ flex: '1', border: 'none', outline: 'none', fontSize: '16px', fontWeight: 'bold', padding: '5px', borderRadius: '10px' }}
                    placeholder="Add a tag and press ENTER..."
                />
            </div>
            <GradientButton
                variant="contained hover:scale-105 active:scale-90"
                style={{ borderRadius: '8px', marginRight: '8px', marginLeft: '8px', fontWeight: 'bold', color: 'your-color' }}
                onClick={takeInput}>
                APPLY
            </GradientButton>
        </div>
    );
};

export default TagsInput;
