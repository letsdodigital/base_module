import React from "react";
import styles from "../styles/Observations.module.css";

interface ObservationsProps {
  id: string;
}

const Observations: React.FC<ObservationsProps> = ({ id }) => {
  console.log("Observations id inside:", id);

  return (
    <div className={styles.container}>
      <h1>Observations</h1>
      <p>This is a basic test page for the Observations module.</p>
      <p>
        <strong>Patient ID:</strong> {id}
      </p>
    </div>
  );
};

export default Observations;
