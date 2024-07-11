import React, { useState } from "react";
import styles from "./Counter.module.css";
import classNames from "classnames";
import IconMinus from "../icons/IconMinus";
import IconPlus from "../icons/IconPlus";

function Counter({ onCountChange }) {
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount((prevCount) => {
      const newCount = prevCount + 1;
      onCountChange(newCount);
      return newCount;
    });
  };

  const decrementCount = () => {
    setCount((prevCount) => {
      if (prevCount > 0) {
        const newCount = prevCount - 1;
        onCountChange(newCount);
        return newCount;
      }
      return prevCount;
    });
  };

  return (
    <div className={classNames(styles.counter)}>
      <button onClick={decrementCount}>
        <IconMinus />
      </button>
      <div>{count}</div>
      <button onClick={incrementCount}>
        <IconPlus />
      </button>
    </div>
  );
}

export default Counter;
