import React, { useState } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};


// Replace these with your actual coordinates
const origin = { lat: 7.210836369425923, lng: 79.84855797924139 };
const destination = { lat: 7.214207, lng: 79.847195 };





const center = {
  lat: (origin.lat + destination.lat) / 2,
  lng: (origin.lng + destination.lng) / 2,
};

const GoogleMapViewWithDirectionsX = () => {
  const [directions, setDirections] = useState(null);


  console.log("Directions: ", directions);

  const directionsCallback = (result) => {
    if (result.status === 'OK') {
      setDirections(result);
    }
  };



  let distance ='';
    let duration ='';
    let durationinseconds ='';
    let durationwithtraffic ='';
  



    if(directions && directions.routes && directions.routes.length > 0){
        const legs = directions.routes[0].legs;
        distance = legs[0].distance.text;
        duration = legs[0].duration.text;
        durationinseconds = legs[0].duration.value;
        // durationwithtraffic = legs[0].duration_in_traffic.value;
      
            console.log("Duration In Traffiv: ", durationwithtraffic);
    }


  return (
   

    <LoadScript googleMapsApiKey="">
  <GoogleMap
    mapContainerStyle={containerStyle}
    center={center}
    zoom={15}
    mapTypeId="roadmap"
    options={{
      styles: [
        {
          featureType: 'poi',
          stylers: [{ visibility: 'off' }],
        },
        {
          featureType: 'transit',
          elementType: 'labels.icon',
          stylers: [{ visibility: 'off' }],
        },
        {
          featureType: 'road',
          elementType: 'labels.icon',
          stylers: [{ visibility: 'off' }],
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.icon',
          stylers: [{ visibility: 'off' }],
        },
      ],
      mapTypeControl: false,
    }}
  >
    <DirectionsService
      options={{
        destination: destination,
        origin: origin,
        travelMode: 'DRIVING',
      }}
      callback={directionsCallback}
    />
    {directions && <DirectionsRenderer directions={directions} />}
  </GoogleMap>

  <div>
    {/* <p>Distance: {distance}</p>
    <p>Duration: {duration}</p>
    <p>Duration (seconds): {durationinseconds}</p>
    <p>Duration with Traffic: {durationwithtraffic}</p> */}
    
{/* 
    <p>Duration with Traffic: {directions.routes[0].legs[0].duration_in_traffic.text}</p>

    <h1>Duration (seconds) without Traffic: {directions.routes[0].legs[0].duration.value}</h1>
<h1>Duration (seconds) with Traffic: {directions.routes[0].legs[0].duration_in_traffic.value}</h1> */}



  </div>
</LoadScript>












  );
};

export default GoogleMapViewWithDirectionsX;
