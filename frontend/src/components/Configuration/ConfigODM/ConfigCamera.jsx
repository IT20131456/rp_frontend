import React, { useState } from "react";
import "./ConfigCamera.css"; // Create a CSS file for styling

const ConfigCamera = () => {
  const [points, setPoints] = useState({
    X1Y1: { x: 0, y: 0 },
    X2Y2: { x: 0, y: 0 },
    X3Y3: { x: 0, y: 0 },
    X4Y4: { x: 0, y: 0 },
  });

  // Image URL (modify this to point to your image)
  const imageURL =
    "https://drive.google.com/uc?id=1aJhJIBc4nvzpUSpdNAXTzpwYje-yml6D";

  const handlePointChange = (e) => {
    const { name, value } = e.target;
    const [point, coordinate] = name.split("-");
    setPoints((prevPoints) => ({
      ...prevPoints,
      [point]: {
        ...prevPoints[point],
        [coordinate]: parseInt(value) || 0,
      },
    }));
  };

  const handleReset = () => {
    setPoints({
      X1Y1: { x: 0, y: 0 },
      X2Y2: { x: 0, y: 0 },
      X3Y3: { x: 0, y: 0 },
      X4Y4: { x: 0, y: 0 },
    });
  };

  return (
    <div className="widget-container">
      <div className="image-container">
        <img src={imageURL} alt="Image" className="image" />
        <svg className="lines">
          <line
            x1={points.X1Y1.x}
            y1={points.X1Y1.y}
            x2={points.X2Y2.x}
            y2={points.X2Y2.y}
          />
          <line
            x1={points.X2Y2.x}
            y1={points.X2Y2.y}
            x2={points.X3Y3.x}
            y2={points.X3Y3.y}
          />
          <line
            x1={points.X3Y3.x}
            y1={points.X3Y3.y}
            x2={points.X4Y4.x}
            y2={points.X4Y4.y}
          />
          <line
            x1={points.X4Y4.x}
            y1={points.X4Y4.y}
            x2={points.X1Y1.x}
            y2={points.X1Y1.y}
          />
        </svg>
        {Object.entries(points).map(([key, { x, y }]) => (
          <div
            key={key}
            className="point"
            style={{ left: x + "px", top: y + "px", backgroundColor: "red" }}
          />
        ))}
      </div>
      <div className="input-container">
        <table>
          <tbody>
            <tr>
              {Object.entries(points).map(([key, { x, y }]) => (
                <React.Fragment key={key}>
                  <th>
                    <label>{`${key}:`}</label>
                  </th>
                  <th>
                    <input
                      type="number"
                      name={`${key}-x`}
                      value={x}
                      onChange={handlePointChange}
                    />
                    <input
                      type="number"
                      name={`${key}-y`}
                      value={y}
                      onChange={handlePointChange}
                    />
                  </th>
                </React.Fragment>
              ))}
            </tr>
          </tbody>
          <tbody>
            <tr>
              <th>
                <button onClick={handleReset}>Reset</button>
              </th>
              <th>
                <button onClick={handleReset}>Save</button>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConfigCamera;
