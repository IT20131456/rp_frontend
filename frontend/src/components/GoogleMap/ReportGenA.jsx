











import React, { useState, useEffect } from "react";
import Pdf from "react-to-pdf";
import axios from "axios";
import { Table } from "react-bootstrap"; // Import the Table component from React Bootstrap
import { Container } from "react-bootstrap"; // Import the Container component from React Bootstrap


const ref = React.createRef();

function ReportA() {
  const [data, setData] = useState([]);

  const fetchLastUpdatedValues = async () => {
    try {
      const response = await axios.get('http://localhost:5000/get-last-updated-valuesA');
      const reversedData = response.data.data.reverse();
      setData(reversedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchLastUpdatedValues();
  }, []);

  return (

    <Container>
    <div >
        
   

<Pdf targetRef={ref} filename="RoadBReport.pdf">
  {({ toPdf }) => (
    <button 
      onClick={toPdf}
      style={{
        backgroundColor: '#007bff', // Blue color
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        margin: '10px'
      }}
    >
      Generate PDF
    </button>
  )}
</Pdf>

      <div ref={ref}>
    

        <h2>Details Of Road A</h2>
        
    
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Level</th>
              <th>Avg Speed</th>
              <th>Traffic Ratio</th>
              <th>Distance</th>
              <th>Duration in Traffic</th>
              <th>Duration </th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.level}</td>
                <td>{item.avgSpeed}</td>
                <td>{item.trafficRatio}</td>
                <td>{item.distance}</td>
                <td>{item.durationInTraffic}</td>
                <td>{item.durationWithoutTraffic}</td>
                <td>{item.sdate}</td>
                <td>{item.stime}</td>
              </tr>
            ))}
          </tbody>
        </Table>
       
      </div>
    </div>
    </Container>
  );
}

export default ReportA;
