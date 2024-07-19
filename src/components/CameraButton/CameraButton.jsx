import React from "react";
import styles from "./CameraButton.module.css";
// import guandangImg from "../../assets/guandang.png";

const CameraButton = () => {
    const handleRedirect = () => {
        window.open('http://192.168.202.131', '_blank');
      };

  return (
    <section>
      <div className={styles.wrapper}>
        <h2>Untuk Mengawasi Mpus Klik Tombol Di Bawah</h2>
        <div className={styles.cameraContainer}>
          <button className={styles.button} onClick={handleRedirect}>
            Lihat Kamera
          </button>
        </div>
      </div>
    </section>
  );
};

export default CameraButton;
