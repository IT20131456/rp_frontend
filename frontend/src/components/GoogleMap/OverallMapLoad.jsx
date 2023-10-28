import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: 1200,
  height: 900
};

const center = {
  lat: 7.214293660525243, // Replace with the actual latitude of your location
  lng: 79.8472023290871 // Replace with the actual longitude of your location
};//7.214293660525243, 79.8472023290871

const OverallMapComponent = () => {
  return (
    <LoadScript googleMapsApiKey="">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default OverallMapComponent;
