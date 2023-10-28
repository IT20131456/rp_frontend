import React, { useState } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};


// actual coordinates
const origin = { lat: 7.217175713979923, lng: 79.84618219096271  };
const destination = { lat: 7.214375, lng: 79.847213  };





const center = {
  lat: (origin.lat + destination.lat) / 2,
  lng: (origin.lng + destination.lng) / 2,
};

const GoogleMapViewWithDirectionsA = () => {
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




  </div>
</LoadScript>












  );
};

export default GoogleMapViewWithDirectionsA;
