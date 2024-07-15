import React, { useState } from 'react';
import Button from '@mui/material/Button';

import { processAndSortRestaurants } from './Trie';

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
        <div>
            <div style={{ display: 'flex', flexWrap: 'wrap', padding: '1px', border: '1px solid #ccc', borderRadius: '10px' }}>
                {tags.map((tag, index) => (
                    <div key={index} style={{ margin: '5px', padding: '5px', backgroundColor: '#e0e0e0', borderRadius: '8px', fontSize: '13px' }}>
                        {tag}
                        <button onClick={() => removeTag(index)} style={{ marginLeft: '10px', cursor: 'pointer' }}>×</button>
                    </div>
                ))}
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    style={{ flex: '1', border: 'none', outline: 'none', fontSize: '13px', padding: '5px', borderRadius: '10px' }}
                    placeholder="Add a tag..."
                />
            </div>
            <Button variant="contained" className='rounded-md'
                onClick={() => take_input(tags, restaurant, onClick)}>
                <p className='text-main font-extrabold'>APPLY</p>
            </Button>
        </div>
    );
};

export default TagsInput;
