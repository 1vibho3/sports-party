// LocationPicker.js
import React, { useState, useCallback, useRef } from 'react';
import { GoogleMap, LoadScript, Autocomplete } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '400px'
};

const defaultCenter = {
    lat: -3.745,
    lng: -38.523
};

const LocationPicker = ({ onLocationChange }) => {
    const [center, setCenter] = useState(defaultCenter);
    const [autocomplete, setAutocomplete] = useState(null);
    const mapRef = useRef(null);

    const onLoad = useCallback((map) => {
        mapRef.current = map;
    }, []);

    const onUnmount = useCallback(() => {
        mapRef.current = null;
    }, []);

    const onPlaceChanged = () => {
        if (autocomplete !== null) {
            const place = autocomplete.getPlace();
            const location = place.geometry.location;
            setCenter({ lat: location.lat(), lng: location.lng() });
            onLocationChange(place.formatted_address);
        } else {
            console.log('Autocomplete is not loaded yet!');
        }
    };

    return (
        <LoadScript googleMapsApiKey="AIzaSyD-HW9S5AGw16UjMk7G-rn257riBalnrcI" libraries={['places']}>
            <Autocomplete
                onLoad={(autocomplete) => setAutocomplete(autocomplete)}
                onPlaceChanged={onPlaceChanged}
            >
                <input
                    type="text"
                    placeholder="Enter a location"
                    style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
                />
            </Autocomplete>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
                onLoad={onLoad}
                onUnmount={onUnmount}
            />
        </LoadScript>
    );
};

export default LocationPicker;
