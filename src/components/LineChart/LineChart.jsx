import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { ref, onValue, set, get, off, remove } from "firebase/database";
import { database } from "../../firebase";
import styles from "./LineChart.module.css"; // Import CSS module

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = () => {
  const [data, setData] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    // Load data from localStorage if available
    const storedData = localStorage.getItem('chart_data');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setData(parsedData.data || []);
      setLabels(parsedData.labels || []);
    } else {
      // Fetch data from Firebase if not in localStorage
      const fetchData = async () => {
        const snapshot = await get(ref(database, "alat/chart_data"));
        const chartData = snapshot.val();
        if (chartData) {
          setData(chartData.data || []);
          setLabels(chartData.labels || []);
          // Store fetched data in localStorage
          localStorage.setItem('chart_data', JSON.stringify(chartData));
        }
      };

      fetchData();
    }

    const sensorRef = ref(database, "alat/sensor_loadcell");

    const handleDataUpdate = (snapshot) => {
      const dataSensor = snapshot.val();
      console.log("Updated data from Firebase:", dataSensor);

      // Only update state and Firebase if new data is different
      setData((prevData) => {
        // Check if the new data is different from the previous data
        if (prevData.length === 0 || prevData[prevData.length - 1] !== dataSensor) {
          const newData = [...prevData, dataSensor];
          setLabels((prevLabels) => {
            const newLabels = [...prevLabels, new Date().toLocaleTimeString()];
            set(ref(database, "alat/chart_data"), {
              data: newData,
              labels: newLabels,
            });
            // Update localStorage with new data
            localStorage.setItem('chart_data', JSON.stringify({
              data: newData,
              labels: newLabels,
            }));
            return newLabels;
          });
          return newData;
        }
        return prevData;
      });
    };

    onValue(sensorRef, handleDataUpdate);

    return () => {
      off(sensorRef, "value", handleDataUpdate);
    };
  }, []);

  const handleReset = async () => {
    // Clear data from Firebase
    await remove(ref(database, "alat/chart_data"));
    // Clear localStorage
    localStorage.removeItem('chart_data');
    // Reset state
    setData([]);
    setLabels([]);
  };

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Nilai Sensor",
        data: data,
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Kapasitas Makanan Kucing",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 200,
      },
    },
  };

  const lastValue = data.length > 0 ? data[data.length - 1] : null;

  return (
    <section className={styles.chartSectionLine}>
      <div className={styles.chartFlex}>
        <div className={styles.container}>
          <h1>Grafik Makanan</h1>
          <div className={styles.chartWrapper}>
            <Line data={chartData} options={options} />
          </div>
          <h1 className={styles.lastValue}>{lastValue}</h1>
          <button className={styles.resetButton} onClick={handleReset}>Reset Data</button>
        </div>
      </div>
    </section>
  );
};

export default LineChart;
