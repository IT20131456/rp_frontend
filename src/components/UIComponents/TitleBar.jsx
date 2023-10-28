import React from 'react';
import { Link } from "react-router-dom";

const TitleBar = ({ title }) => {

  const titleBarStyles = {
    backgroundColor: '#2c3e50',
    color: '#ffffff',
    padding: '10px',
    fontSize: '20px',
    fontWeight: 'bold',
    width: '100%',
    borderRadius: '10px',
  };

  return (
    <div style={titleBarStyles}>
      <i class="fa fa-arrow-left" aria-hidden="true"></i> &nbsp;&nbsp;
      
      {title}
    </div>
  );
};

export default TitleBar;
