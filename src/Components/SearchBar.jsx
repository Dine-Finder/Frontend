//src SearchBar.jsx
import React, { useState, useRef, useEffect }from 'react';

const loadScript = (url, callback)=>{
    const existingScript = document.querySelector(`script[src="${url}"]`);
    if (!existingScript){
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        script.async = true;
        script.defer = true;
        script.onload = callback;
        document.head.appendChild(script);
    } else {
        callback();
    }
};

const SearchBar = ({onDataFromParent}) => {
    const [selectedPlace, setSelectedPlace] = useState(null);
    const inputRef = useRef(null);
    const autocompleteRef = useRef(null);
    const key=require('../config')

    useEffect(()=>{
        loadScript(`https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places`, () => {
            const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
              types: ['geocode'],
            });
            autocomplete.addListener('place_changed', () => {
                const place = autocomplete.getPlace();
                if (place.geometry){
                    const location = place.geometry.location;
                    setSelectedPlace({
                        lat: location.lat(),
                        lng: location.lng()
                    });
                }
            });
            autocompleteRef.current = autocomplete;
        });
    },[]);

    useEffect(()=>{
        if (selectedPlace){
            onDataFromParent(selectedPlace.lng, selectedPlace.lat)
        }
    }, [selectedPlace]);

    return (
        <div className='mt-1 mx-2'>
            <input
                ref={inputRef}
                type="text"
                placeholder="Enter a location"
                // style={{
                // boxSizing: 'border-box',
                // border: '1px solid',
                // width: '240px',
                // height: '32px',
                // padding: '0 12px',
                // borderRadius: '3px',
                // boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
                // fontSize: '14px',
                // outline: 'none',
                // textOverflow: 'ellipses',
                // }}
                className='
                    border-[2px]
                    border-main
                    w-full
                    '
            />
            {/* {selectedPlace && (
                <div>
                <p>Latitude: {selectedPlace.lat}</p>
                <p>Longitude: {selectedPlace.lng}</p>
                </div>
            )} */}

        </div>
    );
};

export default SearchBar