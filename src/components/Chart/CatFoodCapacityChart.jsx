import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { ref, onValue } from "firebase/database";
import { database } from "../../firebase"; // Impor instance database dari file firebase.js
import styles from "./CatFoodCapacityChart.module.css"; // Impor CSS module
import guandangImg from "../../assets/guandang.png";

// Register elements and components in Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const CatFoodCapacityChart = () => {
  const [chartData, setChartData] = useState({
    labels: ["Loading...", "Loading..."],
    datasets: [
      {
        label: "Kapasitas Makanan Kucing",
        data: [0, 0],
        backgroundColor: [
          "rgba(211, 211, 211, 0.6)",
          "rgba(211, 211, 211, 0.6)",
        ],
        borderColor: ["rgba(211, 211, 211, 1)", "rgba(211, 211, 211, 1)"],
        borderWidth: 1,
      },
    ],
  });
  const [message, setMessage] = useState("");
  const [messageClass, setMessageClass] = useState(""); // State untuk kelas CSS pesan
  const [messageDataClass, setMessageDataClass] = useState(""); // State untuk kelas CSS pesan
  const [realtimeData, setRealtimeData] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      const dataRef = ref(database, "alat/sensor_loadcell");
      onValue(dataRef, (snapshot) => {
        const data = snapshot.val();
        console.log("Data from Firebase:", data); // Debug: Log data dari Firebase
        // const capacity = data?.capacity || 0; // Asumsi bahwa data memiliki properti 'capacity'

        // Normalize data to maximum of 250
        // const normalizedData = capacity > 250 ? 250 : capacity;
        setRealtimeData(data);

        setChartData({
          labels: ["Empty", "Filled"],
          datasets: [
            {
              label: "Kapasitas Makanan Kucing",
              data: [250 - data, data], // Menggunakan kapasitas metal yang diperoleh dari Firebase
              backgroundColor: [
                "rgba(255, 99, 132, 0.6)",
                "rgba(75, 192, 192, 0.6)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 0.6)",
                "rgba(75, 192, 192, 0.6)",
              ],
              borderWidth: 1,
            },
          ],
        });

        if (data < 80) {
          setMessage("Makanan mpus belum terisi");
          setMessageClass(styles.redTextMessage); // Set kelas untuk teks merah
        } else {
          setMessage("Makanan mpus udah terisi");
          setMessageClass(styles.greenTextMessage); // Set kelas untuk teks hijau
        }

        if (data < 80) {
          setMessageDataClass(styles.redText); // Set kelas untuk teks merah
        } else {
          setMessageDataClass(styles.greenText); // Set kelas untuk teks hijau
        }
      });
    };

    fetchData();
  }, []);

  return (
    <section className={styles.chartSection}>
      <div className={styles.container}>
        <div className={styles.chartBox}>
          <h2>Kapasitas Makanan Kucing</h2>
          <div className={styles.imgChartFlex}>
            <img src={guandangImg} alt="cat" />
            <div className={styles.chartContainer}>
              <Pie data={chartData} />
            </div>
          </div>
          <h3 className={messageDataClass}>{realtimeData} gram</h3>
          <p className={messageClass}>{message}</p>
        </div>
      </div>
    </section>
  );
};

export default CatFoodCapacityChart;
