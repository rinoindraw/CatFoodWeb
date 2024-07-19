import React from 'react';
import styles from './Camera.module.css';

const Camera = () => {
  return (
    <div className={styles.cameraContainer}>
      <iframe 
        src="http://192.168.202.131" 
        className={styles.iframe}
        title="Camera"
      ></iframe>
    </div>
  );
}

export default Camera;