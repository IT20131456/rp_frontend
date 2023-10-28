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

const ResponsiveGrid2 = ({ gridItems }) => {
  return (
    <div style={gridStyles}>
      {gridItems.map((item, index) => (
        // <Link to={`/${item.link}`} style={{ textDecoration: 'none' }} key={index}>
        //   <div style={itemStyles}>
        //     <h5 style={{ textAlign: 'center', color: 'white' }}>{item.titleName}</h5>
        //     <i className="fas fa-fw fa-cog" style={configIconStyles}></i>
        //   </div>
        // </Link>
        <Link to={`/${item.link}`} style={{ textDecoration: "none" }} key={index}>
        <div className="col-md-12 mb-4">
          <div className={`card border-left-success shadow h-100 py-2`}>
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className={`text-s font-weight-bold text-success text-uppercase mb-1`}>
                  {item.titleName}
                  </div>
                  <div className="row no-gutters align-items-center">
                    <div className="col-auto">
                      <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                        
                      </div>
                    </div>
                    <div className="col">
                      <div className="progress progress-sm mr-2">
                        <div
                          className="progress-bar bg-info a1"
                          role="progressbar"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-auto">
                <i className={`fas fa-fw fa-cog fa-2x text-gray-300 text-success`}></i>
                  {/* <i className="fas fa-clipboard-list fa-2x text-gray-300 text-info"></i> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
      ))}
    </div>
  );
};

export default ResponsiveGrid2;
