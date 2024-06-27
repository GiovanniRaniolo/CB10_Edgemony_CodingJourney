import React, { useState } from "react";
import "./Calculator.css";
import Display from "../Display/Display.jsx";
import Button from "../Button/Button.jsx";

const buttonValues = [
  "7",
  "8",
  "9",
  "/",
  "4",
  "5",
  "6",
  "*",
  "1",
  "2",
  "3",
  "-",
  "0",
  ".",
  "=",
  "+",
  "%",
  "C",
  "←",
  "√",
];

const Calculator = () => {
  const [displayValue, setDisplayValue] = useState("0");
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [operand, setOperand] = useState(null);

  const handleButtonClick = (label) => {
    if ((label >= "0" && label <= "9") || label === ".") {
      handleNumber(label);
    } else if (label === "C") {
      handleClear();
    } else if (label === "←") {
      handleBackspace();
    } else if (label === "=") {
      handleEquals();
    } else if (label === "√") {
      handleSquareRoot();
    } else {
      handleOperator(label);
    }
  };

  const handleNumber = (number) => {
    if (waitingForOperand) {
      setDisplayValue(number);
      setWaitingForOperand(false);
    } else {
      setDisplayValue(displayValue === "0" ? number : displayValue + number);
    }
  };

  const handleClear = () => {
    setDisplayValue("0");
    setOperator(null);
    setWaitingForOperand(false);
    setOperand(null);
  };

  const handleBackspace = () => {
    setDisplayValue(displayValue.slice(0, -1) || "0");
  };

  const handleOperator = (nextOperator) => {
    const inputValue = parseFloat(displayValue);

    if (operand == null) {
      setOperand(inputValue);
    } else if (operator) {
      const currentOperand = operand || 0;
      const newValue = performCalculation(currentOperand, inputValue, operator);

      setOperand(newValue);
      setDisplayValue(formatResult(newValue));
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const handleEquals = () => {
    const inputValue = parseFloat(displayValue);

    if (operator && operand != null) {
      const currentOperand = operand || 0;
      const newValue = performCalculation(currentOperand, inputValue, operator);

      setDisplayValue(formatResult(newValue));
      setOperand(null);
      setOperator(null);
      setWaitingForOperand(false);
    }
  };

  const handleSquareRoot = () => {
    const inputValue = parseFloat(displayValue);
    const newValue = Math.sqrt(inputValue);

    setDisplayValue(formatResult(newValue));
  };

  const performCalculation = (left, right, operator) => {
    switch (operator) {
      case "+":
        return left + right;
      case "-":
        return left - right;
      case "*":
        return left * right;
      case "/":
        return left / right;
      case "%":
        return left % right;
      default:
        return right;
    }
  };

  const formatResult = (value) => {
    const stringValue = value.toString();
    if (stringValue.length > 10) {
      return parseFloat(value.toPrecision(10));
    }
    return value;
  };

  return (
    <div className="calculator">
      <Display value={displayValue} />
      <div className="button-container">
        {buttonValues.map((value, index) => (
          <Button
            key={index}
            label={value}
            onClick={() => handleButtonClick(value)}
          />
        ))}
      </div>
    </div>
  );
};

export default Calculator;
