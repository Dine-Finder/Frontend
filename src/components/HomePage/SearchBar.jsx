import React, { useState, useRef, useEffect } from 'react';

const loadScript = (url, callback) => {
    const existingScript = document.querySelector(`script[src="${url}"]`);
    if (!existingScript) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        script.async = true;
        script.defer = true;
        script.onload = () => callback && callback();
        document.head.appendChild(script);
    } else if (existingScript && callback) {
        if (existingScript.getAttribute('data-loaded') === 'true') {
            callback();
        } else {
            // Set an onload function if not already loaded
            existingScript.onload = () => {
                existingScript.setAttribute('data-loaded', 'true');
                callback();
            }
        }
    }
};

const SearchBar = ({ onDataFromParent }) => {
    const [selectedPlace, setSelectedPlace] = useState(null);
    const inputRef = useRef(null);
    const autocompleteRef = useRef(null);
    const key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    useEffect(() => {
        loadScript(`https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places`, () => {
            if (window.google && window.google.maps && inputRef.current) {
                autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
                    types: ['geocode'],
                });
                autocompleteRef.current.addListener('place_changed', () => {
                    const place = autocompleteRef.current.getPlace();
                    if (place.geometry) {
                        const location = place.geometry.location;
                        setSelectedPlace({
                            lat: location.lat(),
                            lng: location.lng()
                        });
                    }
                });
            }
        });
    }, [key]);

    useEffect(() => {
        if (selectedPlace) {
            onDataFromParent(selectedPlace.lng, selectedPlace.lat);
        }
    }, [selectedPlace, onDataFromParent]);

    return (
        <div className='m-2'>
            <input
                ref={inputRef}
                type="text"
                placeholder="Enter a location"
                className='
                    appearance-none
                    w-full
                    bg-gray-800
                    text-sm
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
            />
        </div>
    );
};

export default SearchBar;
