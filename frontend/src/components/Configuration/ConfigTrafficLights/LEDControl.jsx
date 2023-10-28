import React, { useState } from 'react';
import axios from 'axios';

const LEDControl = () => {
  const [ledState, setLedState] = useState(0); // 0 for off, 1 for on
  const username = "LoshithHasinda";
    const feedKey = "lane01green";
    const aioKey = "aio_fRdc93an41mPgnTAXbzSogPe0lqI";

  // Function to turn LED on
  const turnOnLED = async () => {
    try {
      const response = await axios.post(
        `https://io.adafruit.com/api/v2/${username}/feeds/${feedKey}/data`,
        { value: '1' },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-AIO-Key': aioKey,
          },
        }
      );
      console.log(response.data);
      setLedState(1);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to turn LED off
  const turnOffLED = async () => {
    try {
      const response = await axios.post(
        `https://io.adafruit.com/api/v2/${username}/feeds/${feedKey}/data`,
        { value: '0' },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-AIO-Key': aioKey,
          },
        }
      );
      console.log(response.data);
      setLedState(0);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={turnOnLED}>Turn On LED</button>
      <button onClick={turnOffLED}>Turn Off LED</button>
      <p>LED is currently: {ledState === 1 ? 'On' : 'Off'}</p>
    </div>
  );
};

export default LEDControl;
