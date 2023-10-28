import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import SideNavigationBar from "../../NavigationBar/SideNavigationBar";
import TopNavigationBar from "../../NavigationBar/TopNavigationBar";
import "../../NavigationBar/NavigationStyle.css";
import TitleBar from "../../UIComponents/TitleBar.jsx";
import Table from "react-bootstrap/Table";
import Button from 'react-bootstrap/Button';

export default function ConfigTrafficLight() {

  const username = "LoshithHasinda";
  const feedKey = "lane01green";
  const aioKey = "aio_fRdc93an41mPgnTAXbzSogPe0lqI";

  const [allFeeds, setAllFeeds] = useState([]); // State variable to store all feeds
  const [feedValue, setFeedValue] = useState(null);

  useEffect(() => {
    //fetchFeedValue();
    fetchAllFeeds();
  }, []);

  const fetchAllFeeds = async () => {
    try {
      const response = await axios.get(
        `https://io.adafruit.com/api/v2/${username}/feeds`,
        {
          headers: {
            'Content-Type': 'application/json',
            'X-AIO-Key': aioKey,
          },
        }
      );
      console.log(response.data);
      setAllFeeds(response.data);
      // Update your component state with the retrieved data
    } catch (error) {
      console.error(error);
    }
  };

  // const fetchFeedValue = async () => {
  //   try {
  //     const response = await axios.get(
  //       `https://io.adafruit.com/api/v2/${username}/feeds/${feedKey}/data/last`,
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'X-AIO-Key': aioKey,
  //         },
  //       }
  //     );
  //     console.log(response.data);
  //     setFeedValue(response.data.value);
  //     // Update your component state with the retrieved data
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // Function to turn LED on
  const turnOnLED = async (selectedFeedKey) => {
    try {
      const response = await axios.post(
        `https://io.adafruit.com/api/v2/${username}/feeds/${selectedFeedKey}/data`,
        { value: '1' },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-AIO-Key': aioKey,
          },
        }
      );
      console.log(response.data);
      fetchAllFeeds();
      //setLedState(1);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to turn LED off
  const turnOffLED = async (selectedFeedKey) => {
    try {
      const response = await axios.post(
        `https://io.adafruit.com/api/v2/${username}/feeds/${selectedFeedKey}/data`,
        { value: '0' },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-AIO-Key': aioKey,
          },
        }
      );
      console.log(response.data);
      fetchAllFeeds();
      //setLedState(0);
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div className="wrapper">
      {/* Top Navigation */}
      <TopNavigationBar />

      {/* Sidebar and Content */}
      <div className="content-wrapper">
        {/* Sidebar Column */}
        <div className="sidebar-column">
          <SideNavigationBar />
        </div>

        {/* Content Column */}
        <div className="content-column">
          <TitleBar title="Config Traffic Lights" />
          <div style={{ margin: "10px" }}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Traffic Light ID</th>
                  <th>Current Value</th>
                  <th>Current Status</th>
                  <th>Manaual Control</th>
                </tr>
              </thead>
              <tbody>
                {allFeeds.map((feed) => (
                  <tr>
                  <td>{feed.name}</td>
                  <td>{feed.last_value}</td>
                  <td>{feed.last_value === '1' ? <CircleIndicator isOn={true} /> : <CircleIndicator isOn={false} />}</td>
                  <td><Button variant="light" onClick={() => turnOffLED(feed.key)}>Off</Button> <Button variant="light" onClick={() => turnOnLED(feed.key)}>On</Button></td>
                </tr>
                ))}
                
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

const CircleIndicator = ({ isOn }) => {
  const indicatorStyle = {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: isOn ? '#28a745' : '#dc3545',
    transition: 'background-color 0.3s',
  };

  const innerCircleStyle = {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: 'white',
  };

  return (
    <div style={indicatorStyle}>
      <div style={innerCircleStyle}></div>
    </div>
  );
};
