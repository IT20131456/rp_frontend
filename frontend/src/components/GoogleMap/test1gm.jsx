import React from "react";

function Test1gm() {
  const lat = 7.214258;
  const lon = 79.847186;

  // Replace these two variables with the coordinates of your destination
  const destinationLat = 7.123456;
  const destinationLon = 79.765432;

  // Create a Google Maps directions URL
  const directionsUrl = `https://www.google.com/maps/dir/${lat},${lon}/${destinationLat},${destinationLon}/`;

  return (
    <div>
      <iframe
        title="Google Maps Directions"
        src={directionsUrl}
        height="700px"
        width="100%"
      ></iframe>
    </div>
  );
}

export default Test1gm;
