import React from "react";
import AdviceCard from "./components/AdviceCard/AdviceCard";
import styles from "./App.module.css";

const App = () => {
  return (
    <div className={styles.app}>
      <AdviceCard />
    </div>
  );
};

export default App;
