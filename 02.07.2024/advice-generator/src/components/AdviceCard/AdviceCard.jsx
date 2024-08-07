import React, { useState } from "react";
import adviceData from "../../assets/advice.json";
import { Button } from "../Button/Button.jsx";
import styles from "./AdviceCard.module.css";
import buttonStyle from "../Button/Button.module.css";
import patternDividerSVG from "./icons/pattern-divider-desktop.svg";
import iconDice from "./icons/icon-dice.svg";

const getRandomAdvice = () => {
  const randomIndex = Math.floor(Math.random() * adviceData.length);
  return adviceData[randomIndex];
};

const AdviceCard = () => {
  const [advice, setAdvice] = useState(getRandomAdvice());

  const handleNewAdvice = () => {
    setAdvice(getRandomAdvice());
  };

  return (
    <div className={styles.card}>
      <h1>ADVICE #{advice.id}</h1>
      <p>"{advice.advice}"</p>
      <img
        src={patternDividerSVG}
        alt="Pattern Divider"
        className={styles.patternDivider}
      />
      <Button onClick={handleNewAdvice}>
        <img src={iconDice} alt="icon dice" className={buttonStyle.iconDice} />
      </Button>
    </div>
  );
};

export default AdviceCard;
