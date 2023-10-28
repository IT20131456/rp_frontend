



// Create a custom marker icon with text using Google Charts API
function createMarkerIcon(label) {
  return {
    url:
      "https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=" +
      label +
      "|FF0000|000000",
    labelOrigin: new google.maps.Point(11, 50),
    size: new google.maps.Size(22, 40),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(11, 40),
    label: {
      text: label,
      color: "#FFFFFF",
      fontWeight: "bold",
    },
  };
}

// Initialize and display the map
function initMap() {
  var map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 7.214264372945036, lng: 79.84722105744152 }, // center coordinates
    zoom: 17, //  initial zoom level

    styles: [
      {
        featureType: "poi",
        elementType: "labels",
        stylers: [{ visibility: "off" }],
      },
    ],
  });

  //reload


  

  
  //end reload

  // Add the Traffic Layer to the map
  var trafficLayer = new google.maps.TrafficLayer();
  trafficLayer.setMap(map);

  // Retrieve traffic data and display traffic condition
  // var origin = { lat: 7.213020, lng: 79.847918 }; // desired origin
  // var destination = { lat: 7.214258, lng: 79.847186 }; // desired destination

  var origin = { lat: 7.210924434642626, lng: 79.84874580970049 }; // desired origin
  var destination = { lat: 7.214258, lng: 79.847186 }; //  desired destination

  // var x = {lat:7.212940600103061, lng:79.84773024845654}
  // var y = {lat:7.214177827666721, lng:79.84711578006764}

  var x = { lat: 7.210836369425923, lng: 79.84855797924139 };
  // var y = { lat: 7.214133182687369, lng: 79.8470178168183 };
  var y = { lat: 7.214084075114835, lng: 79.84702427990267 };

  var q = { lat: 7.212853531714604, lng: 79.84375877992322 };
  var r = { lat: 7.214417716580489, lng: 79.8470335150753 };

  var a = { lat: 7.217175713979923, lng: 79.84618219096271 };
  var b = { lat: 7.214445566112564, lng: 79.84743483824434 };

  var m = { lat: 7.215747916985077, lng: 79.85064534489413 };
  var n = { lat: 7.2141410557573975, lng: 79.84739202025193 };

  var t = { lat: 7.214275706366223, lng: 79.84720592034878 };

  var tMarker = new google.maps.Marker({
    position: t,
    map: map,
    title: "Traffic Light",
    icon: createMarkerIcon("T"),
  });

  var service = new google.maps.DistanceMatrixService();
  service.getDistanceMatrix(
    {
      origins: [origin],
      destinations: [destination],
      travelMode: "DRIVING",
      drivingOptions: {
        departureTime: new Date(Date.now()),
        trafficModel: "bestguess",
      },
    },
    function (response, status) {
      if (status === "OK") {
        var fromXToY = response.rows[0].elements[0].duration_in_traffic.text;
        var fromYToX = response.rows[0].elements[0].duration.text;
        var durationInTraffic =
          response.rows[0].elements[0].duration_in_traffic.value;
        var durationWithoutTraffic =
          response.rows[0].elements[0].duration.value;
        var distance = response.rows[0].elements[0].distance.text;

        var averageSpeed = calculateAverageSpeed(distance, durationInTraffic);
        console.log("Average speed:", averageSpeed);

        var trafficStatus = getTrafficStatus(
          durationInTraffic,
          durationWithoutTraffic
        );
        console.log("Traffic status from X to Y:", trafficStatus);
        console.log("Duration in traffic:", durationInTraffic);
        console.log("Duration without traffic:", durationWithoutTraffic);
        console.log("Duration from X to Y:", fromXToY);
        console.log("Duration from Y to X:", fromYToX);
        console.log("Distance:", distance);

        var backgroundColor;

        if (trafficStatus === "Excellent traffic") {
          backgroundColor = "#ADD8E6";
        } else if (trafficStatus === "Good traffic") {
          backgroundColor = "#90EE90";
        } else if (trafficStatus === "Moderate traffic") {
          backgroundColor = "#FFFFE0";
        } else if (trafficStatus === "Busy traffic") {
          backgroundColor = "#FFD580";
        } else if (trafficStatus === "Heavy traffic") {
          backgroundColor = "#FF7276";
        } else {
          backgroundColor = "#ADD8E6";
        }

        var infoWindowContent =
          '<div style="background-color: ' +
          backgroundColor +
          '; color: #333; padding: 10px; border-radius: 5px;">' +
          '<p style="font-weight: bold; color: red;">LIVE UPDATE .</p>' +
          "<p><b>Traffic Ratio:</b> " +
          (durationInTraffic / durationWithoutTraffic).toFixed(4) +
          "</p>" +
          "<p><b>Traffic Status:</b> " +
          trafficStatus +
          "</p>" +
          "<p><b>Average Speed:</b> " +
          averageSpeed.toFixed(2) +
          " km/h</p>" +
          "<p><b>Duration in Traffic:</b> " +
          durationInTraffic +
          " seconds</p>" +
          "<p><b>Duration without Traffic:</b> " +
          durationWithoutTraffic +
          " seconds</p>" +
          "<p><b>Duration from X to T:</b> " +
          response.rows[0].elements[0].duration_in_traffic.text +
          "</p>" +
          "<p><b>Duration from T to X (Without Traffic):</b> " +
          response.rows[0].elements[0].duration.text +
          "</p>" +
          "<p><b>Distance:</b> " +
          distance +
          "</p>" +
          "</div>";

        // Create info window
        var infoWindow = new google.maps.InfoWindow({
          content: infoWindowContent,
        });

        // Add markers for origin and destination
        var originMarker = new google.maps.Marker({
          position: x,
          map: map,
          title: "Origin",
          icon: createMarkerIcon("X"),
        });

        originMarker.addListener("click", function () {
          infoWindow.open(map, originMarker);
        });

        // Create a custom overlay for displaying text
        var textOverlay = new google.maps.OverlayView();
        textOverlay.onAdd = function () {
          var textContainer = document.createElement("div");
          textContainer.style.position = "absolute";
          textContainer.style.fontSize = "14px";
          textContainer.style.fontWeight = "bold";
          textContainer.style.color = "black";

          //   textContainer.innerHTML = 'Average Speed: ' +  averageSpeedMN.toFixed(2)+ ' km/h';

          textContainer.innerHTML =
            '<span style="font-weight: bold;color: red;">Average Speed:</span> ' +
            averageSpeed.toFixed(2) +
            ' km/h<br><span style="color: red;">Distance: </span>' +
            distance;

          this.getPanes().overlayLayer.appendChild(textContainer);
          this.textContainer = textContainer;
        };

        textOverlay.draw = function () {
          var projection = this.getProjection();
          if (!projection || !this.textContainer) return;

          // Specify the latitude and longitude for the position
          var latitude = 7.212332933411853; //  desired latitude
          var longitude = 79.84705427226966; //  desired longitude

          var position = projection.fromLatLngToDivPixel(
            new google.maps.LatLng(latitude, longitude)
          );
          this.textContainer.style.left = position.x + "px";
          this.textContainer.style.top = position.y - 7 + "px"; // Adjust the position to center the text vertically
        };

        textOverlay.setMap(map);

        var lineCoordinates = [x, y];

        var lineSymbol = {
          path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
          scale: 3,
          strokeColor: "#000000",
        };

        var line = new google.maps.Polyline({
          path: lineCoordinates,
          geodesic: true,
          icons: [
            {
              icon: lineSymbol,
              offset: "100%",
            },
          ],
          strokeOpacity: 1.0,
          strokeWeight: 3,
          map: map,
        });

        // Create an info window
        var infoWindow = new google.maps.InfoWindow({
          content: infoWindowContent,
        });

        // Listen for 'mouseover' event on the line
        google.maps.event.addListener(line, "mouseover", function () {
          // Open the info window at the line's midpoint
          var midPoint =
            lineCoordinates[Math.floor(lineCoordinates.length / 2)];
          infoWindow.setPosition(midPoint);
          infoWindow.open(map);
        });

        // Listen for 'mouseout' event on the line
        google.maps.event.addListener(line, "mouseout", function () {
          // Close the info window
          infoWindow.close();
        });
      } else {
        console.error(
          "Unable to retrieve traffic information. Status:",
          status
        );
      }
    }
  );





  

  // Lane 2

  service.getDistanceMatrix(
    {
      origins: [q],
      destinations: [r],
      travelMode: "DRIVING",
      drivingOptions: {
        departureTime: new Date(Date.now()),
        trafficModel: "bestguess",
      },
    },
    function (response, status) {
      if (status === "OK") {
        var fromQToR = response.rows[0].elements[0].duration_in_traffic.text;
        var fromRToQ = response.rows[0].elements[0].duration.text;
        var durationInTrafficQR =
          response.rows[0].elements[0].duration_in_traffic.value;
        var durationWithoutTrafficQR =
          response.rows[0].elements[0].duration.value;
        var distanceQR = response.rows[0].elements[0].distance.text;

        var averageSpeedQR = calculateAverageSpeed(
          distanceQR,
          durationInTrafficQR
        );
        console.log("Average speed(Q to R):", averageSpeedQR);

        var trafficStatusQR = getTrafficStatus(
          durationInTrafficQR,
          durationWithoutTrafficQR
        );
        console.log("Traffic status from Q to R:", trafficStatusQR);
        console.log("Duration in traffic:", durationInTrafficQR);
        console.log("Duration without traffic:", durationWithoutTrafficQR);
        console.log("Duration from Q to R:", fromQToR);
        console.log("Duration from R to Q:", fromRToQ);
        console.log("Distance:", distanceQR);

        var backgroundColor;

        if (trafficStatusQR === "Excellent traffic") {
          backgroundColor = "#ADD8E6";
        } else if (trafficStatusQR === "Good traffic") {
          backgroundColor = "#90EE90";
        } else if (trafficStatusQR === "Moderate traffic") {
          backgroundColor = "#FFFFE0";
        } else if (trafficStatusQR === "Busy traffic") {
          backgroundColor = "#FFD580";
        } else if (trafficStatusQR === "Heavy traffic") {
          backgroundColor = "#FF7276";
        } else {
          backgroundColor = "#ADD8E6";
        }

        var infoWindowContentQR =
          '<div style="background-color: ' +
          backgroundColor +
          '; color: #333; padding: 10px; border-radius: 5px;">' +
          '<p style="font-weight: bold; color: red;">LIVE UPDATE .</p>' +
          "<p><b>Traffic Ratio:</b> " +
          (durationInTrafficQR / durationWithoutTrafficQR).toFixed(4) +
          "</p>" +
          "<p><b>Traffic Status:</b> " +
          trafficStatusQR +
          "</p>" +
          "<p><b>Average Speed:</b> " +
          averageSpeedQR.toFixed(2) +
          " km/h</p>" +
          "<p><b>Duration in Traffic:</b> " +
          durationInTrafficQR +
          " seconds</p>" +
          "<p><b>Duration without Traffic:</b> " +
          durationWithoutTrafficQR +
          " seconds</p>" +
          "<p><b>Duration from Q to T:</b> " +
          response.rows[0].elements[0].duration_in_traffic.text +
          "</p>" +
          "<p><b>Duration from T to Q (Without Traffic):</b> " +
          response.rows[0].elements[0].duration.text +
          "</p>" +
          "<p><b>Distance:</b> " +
          distanceQR +
          "</p>" +
          "</div>";

        // Add markers for origin and destination

        // Add markers for q and r
        var qMarker = new google.maps.Marker({
          position: q,
          map: map,
          title: "Origin",
          icon: createMarkerIcon("Q"),
        });

        qMarker.addListener("click", function () {
          infoWindowQR.open(map, qMarker);
        });

        // Create a custom overlay for displaying text
        var textOverlay = new google.maps.OverlayView();
        textOverlay.onAdd = function () {
          var textContainer = document.createElement("div");
          textContainer.style.position = "absolute";
          textContainer.style.fontSize = "14px";
          textContainer.style.fontWeight = "bold";
          textContainer.style.color = "black";

          //   textContainer.innerHTML = 'Average Speed: ' +  averageSpeedMN.toFixed(2)+ ' km/h';

          textContainer.innerHTML =
            '<span style="font-weight: bold;color: red;">Average Speed:</span> ' +
            averageSpeedQR.toFixed(2) +
            ' km/h<br><span style="color: red;">Distance: </span>' +
            distanceQR;

          this.getPanes().overlayLayer.appendChild(textContainer);
          this.textContainer = textContainer;
        };

        textOverlay.draw = function () {
          var projection = this.getProjection();
          if (!projection || !this.textContainer) return;

          // Specify the latitude and longitude for the position
          var latitude = 7.21390110809233; //  desired latitude
          var longitude = 79.8444802172908; //  desired longitude

          var position = projection.fromLatLngToDivPixel(
            new google.maps.LatLng(latitude, longitude)
          );
          this.textContainer.style.left = position.x + "px";
          this.textContainer.style.top = position.y - 7 + "px"; // Adjust the position to center the text vertically
        };

        textOverlay.setMap(map);

        var lineCoordinatesQR = [q, r];

        var arrowSymbol = {
          path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
          scale: 3,
          strokeColor: "#000000",
        };

        var line = new google.maps.Polyline({
          path: lineCoordinatesQR,
          geodesic: true,
          icons: [
            {
              icon: arrowSymbol,
              offset: "100%",
            },
          ],
          strokeOpacity: 1.0,
          strokeWeight: 3,
          map: map,
        });

        // Create an info window
        var infoWindowQR = new google.maps.InfoWindow({
          content: infoWindowContentQR,
        });

        // Listen for 'mouseover' event on the line
        google.maps.event.addListener(line, "mouseover", function () {
          // Open the info window at the line's midpoint
          var midPoint =
            lineCoordinatesQR[Math.floor(lineCoordinatesQR.length / 2)];
          infoWindowQR.setPosition(midPoint);
          infoWindowQR.open(map);
        });

        // Listen for 'mouseout' event on the line
        google.maps.event.addListener(line, "mouseout", function () {
          // Close the info window
          infoWindowQR.close();
        });

        //----------------------------
      } else {
        console.error(
          "Unable to retrieve traffic information. Status:",
          status
        );
      }
    }
  );

  //lane 2 end

  // Lane 3 start

  service.getDistanceMatrix(
    {
      origins: [a],
      destinations: [b],
      travelMode: "DRIVING",
      drivingOptions: {
        departureTime: new Date(Date.now()),
        trafficModel: "bestguess",
      },
    },
    function (response, status) {
      if (status === "OK") {
        var fromAToB = response.rows[0].elements[0].duration_in_traffic.text;
        var fromBToA = response.rows[0].elements[0].duration.text;
        var durationInTrafficAB =
          response.rows[0].elements[0].duration_in_traffic.value;
        var durationWithoutTrafficAB =
          response.rows[0].elements[0].duration.value;
        var distanceAB = response.rows[0].elements[0].distance.text;

        var averageSpeedAB = calculateAverageSpeed(
          distanceAB,
          durationInTrafficAB
        );
        console.log("Average speed(A to B):", averageSpeedAB);

        var trafficStatusAB = getTrafficStatus(
          durationInTrafficAB,
          durationWithoutTrafficAB
        );
        console.log("Traffic status from Q to R:", trafficStatusAB);
        console.log("Duration in traffic:", durationInTrafficAB);
        console.log("Duration without traffic:", durationWithoutTrafficAB);
        console.log("Duration from A to B:", fromAToB);
        console.log("Duration from B to B:", fromBToA);
        console.log("Distance:", distanceAB);

        var backgroundColor;

        if (trafficStatusAB === "Excellent traffic") {
          backgroundColor = "#ADD8E6";
        } else if (trafficStatusAB === "Good traffic") {
          backgroundColor = "#90EE90";
        } else if (trafficStatusAB === "Moderate traffic") {
          backgroundColor = "#FFFFE0";
        } else if (trafficStatusAB === "Busy traffic") {
          backgroundColor = "#FFD580";
        } else if (trafficStatusAB === "Heavy traffic") {
          backgroundColor = "#FF7276";
        } else {
          backgroundColor = "#ADD8E6";
        }

        var infoWindowContentAB =
          '<div style="background-color: ' +
          backgroundColor +
          '; color: #333; padding: 10px; border-radius: 5px;">' +
          '<p style="font-weight: bold; color: red;">LIVE UPDATE .</p>' +
          "<p><b>Traffic Ratio:</b> " +
          (durationInTrafficAB / durationWithoutTrafficAB).toFixed(4) +
          "</p>" +
          "<p><b>Traffic Status:</b> " +
          trafficStatusAB +
          "</p>" +
          "<p><b>Average Speed:</b> " +
          averageSpeedAB.toFixed(2) +
          " km/h</p>" +
          "<p><b>Duration in Traffic:</b> " +
          durationInTrafficAB +
          " seconds</p>" +
          "<p><b>Duration without Traffic:</b> " +
          durationWithoutTrafficAB +
          " seconds</p>" +
          "<p><b>Duration from A to T:</b> " +
          response.rows[0].elements[0].duration_in_traffic.text +
          "</p>" +
          "<p><b>Duration from T to A (Without Traffic):</b> " +
          response.rows[0].elements[0].duration.text +
          "</p>" +
          "<p><b>Distance:</b> " +
          distanceAB +
          "</p>" +
          "</div>";

        // Add markers for origin and destination

        // Add markers for q and r
        var aMarker = new google.maps.Marker({
          position: a,
          map: map,
          title: "Origin",
          icon: createMarkerIcon("A"),
        });

        aMarker.addListener("click", function () {
          infoWindowAB.open(map, aMarker);
        });

        // Create a custom overlay for displaying text
        var textOverlay = new google.maps.OverlayView();
        textOverlay.onAdd = function () {
          var textContainer = document.createElement("div");
          textContainer.style.position = "absolute";
          textContainer.style.fontSize = "14px";
          textContainer.style.fontWeight = "bold";
          textContainer.style.color = "black";

          //   textContainer.innerHTML = 'Average Speed: ' +  averageSpeedMN.toFixed(2)+ ' km/h';

          textContainer.innerHTML =
            '<span style="font-weight: bold;color: red;">Average Speed:</span> ' +
            averageSpeedAB.toFixed(2) +
            ' km/h<br><span style="color: red;">Distance: </span>' +
            distanceAB;

          this.getPanes().overlayLayer.appendChild(textContainer);
          this.textContainer = textContainer;
        };

        textOverlay.draw = function () {
          var projection = this.getProjection();
          if (!projection || !this.textContainer) return;

          // Specify the latitude and longitude for the position
          var latitude = 7.216389885589948; //  desired latitude
          var longitude = 79.8467866023232; // desired longitude

          var position = projection.fromLatLngToDivPixel(
            new google.maps.LatLng(latitude, longitude)
          );
          this.textContainer.style.left = position.x + "px";
          this.textContainer.style.top = position.y - 7 + "px"; // Adjust the position to center the text vertically
        };

        textOverlay.setMap(map);

        var lineCoordinatesAB = [a, b];

        var arrowSymbol = {
          path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
          scale: 3,
          strokeColor: "#000000",
        };

        var line = new google.maps.Polyline({
          path: lineCoordinatesAB,
          geodesic: true,
          icons: [
            {
              icon: arrowSymbol,
              offset: "100%",
            },
          ],
          strokeOpacity: 1.0,
          strokeWeight: 3,
          map: map,
        });

        // Create an info window
        var infoWindowAB = new google.maps.InfoWindow({
          content: infoWindowContentAB,
        });

        // Listen for 'mouseover' event on the line
        google.maps.event.addListener(line, "mouseover", function () {
          // Open the info window at the line's midpoint
          var midPoint =
            lineCoordinatesAB[Math.floor(lineCoordinatesAB.length / 2)];
          infoWindowAB.setPosition(midPoint);
          infoWindowAB.open(map);
        });

        // Listen for 'mouseout' event on the line
        google.maps.event.addListener(line, "mouseout", function () {
          // Close the info window
          infoWindowAB.close();
        });

        //----------------------------
      } else {
        console.error(
          "Unable to retrieve traffic information. Status:",
          status
        );
      }
    }
  );

  //lane 3 end

  ////

  // Lane 4 start

  service.getDistanceMatrix(
    {
      origins: [m],
      destinations: [n],
      travelMode: "DRIVING",
      drivingOptions: {
        departureTime: new Date(Date.now()),
        trafficModel: "bestguess",
      },
    },
    function (response, status) {
      if (status === "OK") {
        var fromMToN = response.rows[0].elements[0].duration_in_traffic.text;
        var fromNToM = response.rows[0].elements[0].duration.text;
        var durationInTrafficMN =
          response.rows[0].elements[0].duration_in_traffic.value;
        var durationWithoutTrafficMN =
          response.rows[0].elements[0].duration.value;
        var distanceMN = response.rows[0].elements[0].distance.text;

        var averageSpeedMN = calculateAverageSpeed(
          distanceMN,
          durationInTrafficMN
        );
        console.log("Average speed(M to N):", averageSpeedMN);

        var trafficStatusMN = getTrafficStatus(
          durationInTrafficMN,
          durationWithoutTrafficMN
        );

        var roadCapacity = 150; // Assuming road capacity in vehicles per hour
        // var roadLength = parseFloat(distanceMN); // Assuming road length in kilometers
        var roadLength = 400; // Assuming road length in kilometers
        console.log("Road length:", roadLength);

        var vehicleCountMN = calculateVehicleCount(
          averageSpeedMN,
          roadCapacity,
          roadLength
        );
        console.log("Vehicle count from M to N:", vehicleCountMN);

        console.log("Traffic status from Q to R:", trafficStatusMN);
        console.log("Duration in traffic:", durationInTrafficMN);
        console.log("Duration without traffic:", durationWithoutTrafficMN);
        console.log("Duration from A to B:", fromMToN);
        console.log("Duration from B to B:", fromNToM);
        console.log("Distance:", distanceMN);

        var backgroundColor;

        if (trafficStatusMN === "Excellent traffic") {
          backgroundColor = "#ADD8E6";
        } else if (trafficStatusMN === "Good traffic") {
          backgroundColor = "#90EE90";
        } else if (trafficStatusMN === "Moderate traffic") {
          backgroundColor = "#FFFFE0";
        } else if (trafficStatusMN === "Busy traffic") {
          backgroundColor = "#FFD580";
        } else if (trafficStatusMN === "Heavy traffic") {
          backgroundColor = "#FF7276";
        } else {
          backgroundColor = "#ADD8E6";
        }

        var infoWindowContentMN =
          '<div style="background-color: ' +
          backgroundColor +
          '; color: #333; padding: 10px; border-radius: 5px;">' +
          '<p style="font-weight: bold; color: red;">LIVE UPDATE .</p>' +
          "<p><b>Traffic Ratio:</b> " +
          (durationInTrafficMN / durationWithoutTrafficMN).toFixed(4) +
          "</p>" +
          "<p><b>Traffic Status:</b> " +
          trafficStatusMN +
          "</p>" +
          "<p><b>Average Speed:</b> " +
          averageSpeedMN.toFixed(2) +
          " km/h</p>" +
          "<p><b>Duration in Traffic:</b> " +
          durationInTrafficMN +
          " seconds</p>" +
          "<p><b>Duration without Traffic:</b> " +
          durationWithoutTrafficMN +
          " seconds</p>" +
          "<p><b>Duration from M to T:</b> " +
          response.rows[0].elements[0].duration_in_traffic.text +
          "</p>" +
          "<p><b>Duration from T to M (Without Traffic):</b> " +
          response.rows[0].elements[0].duration.text +
          "</p>" +
          "<p><b>Distance:</b> " +
          distanceMN +
          "</p>" +
          "</div>";

        // Add markers for origin and destination

        // Add markers for q and r
        var mMarker = new google.maps.Marker({
          position: m,
          map: map,
          title: "Origin",
          icon: createMarkerIcon("M"),
        });

        mMarker.addListener("click", function () {
          infoWindowMN.open(map, mMarker);
        });

        // Create a custom overlay for displaying text
        var textOverlay = new google.maps.OverlayView();
        textOverlay.onAdd = function () {
          var textContainer = document.createElement("div");
          textContainer.style.position = "absolute";
          textContainer.style.fontSize = "14px";
          textContainer.style.fontWeight = "bold";
          textContainer.style.color = "black";

          //   textContainer.innerHTML = 'Average Speed: ' +  averageSpeedMN.toFixed(2)+ ' km/h';

          textContainer.innerHTML =
            '<span style="font-weight: bold;color: red;">Average Speed:</span> ' +
            averageSpeedMN.toFixed(2) +
            ' km/h<br><span style="color: red;">Distance: </span>' +
            distanceMN;

          this.getPanes().overlayLayer.appendChild(textContainer);
          this.textContainer = textContainer;
        };

        textOverlay.draw = function () {
          var projection = this.getProjection();
          if (!projection || !this.textContainer) return;

          // Specify the latitude and longitude for the position
          var latitude = 7.214906914126455; // the desired latitude
          var longitude = 79.84900483480594; // desired longitude

          var position = projection.fromLatLngToDivPixel(
            new google.maps.LatLng(latitude, longitude)
          );
          this.textContainer.style.left = position.x + "px";
          this.textContainer.style.top = position.y - 7 + "px"; // Adjust the position to center the text vertically
        };

        textOverlay.setMap(map);

        var lineCoordinatesMN = [m, n];

        var arrowSymbol = {
          path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
          scale: 3,
          strokeColor: "#000000",
        };

        var line = new google.maps.Polyline({
          path: lineCoordinatesMN,
          geodesic: true,
          icons: [
            {
              icon: arrowSymbol,
              offset: "100%",
            },
          ],
          strokeOpacity: 1.0,
          strokeWeight: 3,
          map: map,
        });

        // Create an info window
        var infoWindowMN = new google.maps.InfoWindow({
          content: infoWindowContentMN,
        });

        // Listen for 'mouseover' event on the line
        google.maps.event.addListener(line, "mouseover", function () {
          // Open the info window at the line's midpoint
          var midPoint =
            lineCoordinatesMN[Math.floor(lineCoordinatesMN.length / 2)];
          infoWindowMN.setPosition(midPoint);
          infoWindowMN.open(map);
        });

        // Listen for 'mouseout' event on the line
        google.maps.event.addListener(line, "mouseout", function () {
          // Close the info window
          infoWindowMN.close();
        });

        //----------------------------
      } else {
        console.error(
          "Unable to retrieve traffic information. Status:",
          status
        );
      }
    }
  );

  //lane 4 end

  //lane 4 test

  //test end

  // Calculate vehicle count
  function calculateVehicleCount(averageSpeed, roadCapacity, roadLength) {
    var vehicleCount = Math.round((averageSpeed * roadCapacity) / roadLength);
    return vehicleCount;
  }
}

function calculateAverageSpeed(distance, durationInTraffic) {
  // Remove any whitespace from the distance text
  var distanceCleaned = distance.replace(/\s/g, "");

  // Remove the "km" suffix from the distance text
  var distanceValue = parseFloat(distanceCleaned);

  // Convert meters to kilometers if distance is in meters
  if (distanceCleaned.includes("km")) {
    // distanceValue /= 1000;
  } else {
    distanceValue /= 1000;
  }

  // Convert duration from seconds to hours
  var durationInHours = durationInTraffic / 3600;
  console.log("Duration in hours:", durationInHours);

  console.log("Distance:", distance);

  // Calculate average speed (distance divided by duration in hours)
  var averageSpeed = distanceValue / durationInHours;
  console.log("Average speed:", averageSpeed);

  return averageSpeed;
}

// Determine traffic status based on duration with and without traffic
function getTrafficStatus(durationInTraffic, durationWithoutTraffic) {
  var trafficRatio = durationInTraffic / durationWithoutTraffic;
  console.log("Traffic ratio:", trafficRatio);

  if (trafficRatio <= 1.1) {
    return "Excellent traffic"; // Green color code
  } else if (trafficRatio <= 1.3) {
    return "Good traffic"; // Light green color code
  } else if (trafficRatio <= 1.5) {
    return "Moderate traffic"; // Yellow color code
  } else if (trafficRatio <= 2) {
    return "Busy traffic"; // Orange color code
  } else {
    return "Heavy traffic"; // Red color code
  }
}

// Load the map when the page finishes loading
window.addEventListener("load", function () {
  initMap();
});

//after
