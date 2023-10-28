import React from 'react';
import { Link } from 'react-router-dom';

const gridStyles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  gap: '10px',
};

const itemStyles = {
  width: '100%', // Make the items take 100% width on smaller screens
  height: '100px',
  margin: '10px',
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '10px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  backgroundColor: '#3bb19b',
  transition: 'background-color 0.3s',
};

const configIconStyles = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  color: 'white',
};

const ResponsiveGrid = ({ gridItems }) => {
  return (
    <div style={gridStyles}>
      {gridItems.map((item, index) => (
        <Link to={`/${item.link}`} style={{ textDecoration: 'none' }} key={index}>
          <div style={itemStyles}>
            <h5 style={{ textAlign: 'center', color: 'white' }}>{item.titleName}</h5>
            <i className="fas fa-fw fa-cog" style={configIconStyles}></i>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ResponsiveGrid;
