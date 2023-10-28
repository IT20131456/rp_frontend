import React, { useState } from 'react';
import axios from 'axios';

function ModelCall() {
  const [prediction, setPrediction] = useState(null);

  const handlePredict = () => {
    axios.post('http://127.0.0.1:5000/predict', {
      input: [108, 86, 13.3, 1.25, 0, 0, 1, 0, 0],
    })
      .then(response => {
        setPrediction(response.data.prediction);
        console.log(response.data.prediction);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <button onClick={handlePredict}>Predict</button>
      {prediction !== null && (
        <p>Prediction: {prediction}</p>
      )}
    </div>
  );
}

export default ModelCall;
