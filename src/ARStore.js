// src/ARStore.js
import React from 'react';
import clusteringImage from './images/ARimage.png'; 

function ARStore() {
  return (
    <div>
      <h1>Let's PHYGITALIZE our stores!!</h1>
      <p>Transform 3D models to AR/VR experience using Unity or Infinity engines</p>
      <div>
          <img max-width="100" height="auto" src={clusteringImage} alt="Aisle Clustering Plot" />
        </div>
    </div>
  );
}

export default ARStore;
