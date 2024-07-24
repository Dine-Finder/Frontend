import React, { useState, useRef, useEffect } from 'react';

const loadScript = (url, callback) => {
    const existingScript = document.querySelector(`script[src="${url}"]`);
    if (!existingScript) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        script.async = true;
        script.defer = true;
        script.onload = () => {
            console.log(`Script loaded: ${url}`);
            callback && callback();
        };
        document.head.appendChild(script);
    } else if (existingScript && callback) {
        if (existingScript.getAttribute('data-loaded') === 'true') {
            callback();
        } else {
            existingScript.onload = () => {
                existingScript.setAttribute('data-loaded', 'true');
                callback();
            };
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
                const manhattanBounds = new window.google.maps.LatLngBounds(
                    new window.google.maps.LatLng(40.700292, -74.020181),
                    new window.google.maps.LatLng(40.879038, -73.906058)
                );
                autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
                    bounds: manhattanBounds,
                    componentRestrictions: { country: 'us' },
                    types: ['geocode'],
                    strictBounds: true,
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
        <div className='m-1'>
            <input
                ref={inputRef}
                type="text"
                placeholder="Enter a location"
                className='
                    appearance-none
                    w-full
                    bg-gray-800
                    md:text-base
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
