# React Calculator

This is a simple yet stylish calculator built using React. It supports basic arithmetic operations as well as some additional features like square root, percentage, and backspace.

## Features

- Basic arithmetic operations: addition, subtraction, multiplication, and division.
- Additional operations: square root, percentage, and backspace.
- Clear function to reset the calculator.
- Display up to 10 significant digits.

## Installation

1.  **Clone the repository:**

    `git clone https://github.com/your-username/react-calculator.git`

2.  **Navigate to the project directory:**

    `cd react-calculator`

3.  **Install the dependencies:**

    `npm install`

## Usage

1.  **Start the development server:**

    `npm start`

2.  **Open your browser and navigate to:**

    `http://localhost:xxxxx`

## Components

### `Calculator`

The main component that holds the state and the logic for the calculator.

### `Display`

A stateless component that displays the current value.

### `Button`

A stateless component that represents a single button in the calculator.

## Code Overview

### `Calculator.js`

Handles the state and the logic of the calculator. It uses hooks to manage the state for the display value, the current operator, the operand, and the flag indicating if the calculator is waiting for the next operand.

### `Display.jsx`

Displays the current value of the calculator.

### `Button.jsx`

Represents a single button in the calculator. It accepts `label` and `onClick` props to define its appearance and behavior.

### `Calculator.css`

Contains styles for the calculator layout and appearance.

### `Button.css`

Contains styles for the buttons, including hover and active states.

### How to Add More Buttons

To add more buttons, simply update the `buttonValues` array in `Calculator.js` with the new values. The UI will automatically reflect these changes, but you have to update the logic for the added button.

```js
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
```

## Explanation of the Logic

The logic of the calculator is managed primarily within the `Calculator.jsx` file. Let's break down each part step-by-step:

1. Import statements: The code imports necessary React components and modules, including `useState` from React.

2. Constant `buttonValues`: This array contains the labels for the calculator buttons.

3. `Calculator` function component: This is the main component that renders the calculator UI.

4. State variables: The component uses React hooks to manage state. The `useState` hook is used to create the following state variables:

`displayValue`: Stores the current value displayed on the calculator screen.

`operator`: Stores the currently selected operator.

`waitingForOperand`: Indicates whether the next input should be considered as a new operand.

`operand`: Stores the current operand.

5. Event handlers: The component defines several event handlers to handle button clicks, number input, clear, backspace, square root, and equals operations.

6. `handleButtonClick` function: This function is called when a button is clicked. It determines the type of button clicked and calls the appropriate event handler.

7. `handleNumber` function: This function handles number input. If waitingForOperand is true, it sets the displayValue to the clicked number and sets waitingForOperand to false. Otherwise, it appends the clicked number to the current displayValue.

8. `handleClear` function: This function clears the calculator state by resetting all state variables to their initial values.

9. `handleBackspace` function: This function removes the last character from the displayValue.

10. `handleOperator` function: This function handles operator selection. It parses the displayValue to a float and performs calculations based on the current operator and operand.

11. `handleEquals` function: This function handles the equals operation. It performs calculations based on the current operator and operand, and updates the displayValue accordingly.

12. `handleSquareRoot` function: This function handles the square root operation. It calculates the square root of the displayValue and updates the displayValue.

13. `performCalculation` function: This function performs calculations based on the given operator and operands.

14. `formatResult` function: This function formats the result by converting it to a string and truncating it if it exceeds 10 characters.

15. JSX code: The component renders the calculator UI, including the Display component and a button container with buttons for numbers, operators, and special functions.

### State Management

We use React hooks (`useState`) to manage the state of the calculator.

```jsx
const [displayValue, setDisplayValue] = useState("0");
const [operator, setOperator] = useState(null);
const [waitingForOperand, setWaitingForOperand] = useState(false);
const [operand, setOperand] = useState(null);`
```

- **displayValue:** Stores the current value shown on the display.
- **operator:** Stores the current operator (`+`, `-`, `*`, `/`, `%`) selected by the user.
- **waitingForOperand:** A boolean flag that indicates if the calculator is waiting for the next operand (i.e., the user has just selected an operator).
- **operand:** Stores the value of the first operand before the user selects an operator.

### Handling Button Clicks

The function `handleButtonClick` is responsible for handling clicks on the buttons. It determines the type of button pressed (number, operator, clear, backspace, equals, square root) and delegates to the appropriate handler function.

```jsx
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
```

### Handling Numbers

The function `handleNumber` updates the `displayValue` when a number button is clicked. It also handles the case when the calculator is waiting for a new operand (after an operator has been selected).

```jsx
const handleNumber = (number) => {
  if (waitingForOperand) {
    setDisplayValue(number);
    setWaitingForOperand(false);
  } else {
    setDisplayValue(displayValue === "0" ? number : displayValue + number);
  }
};
```

### Handling Clear

The function `handleClear` resets the calculator to its initial state.

```jsx
const handleClear = () => {
  setDisplayValue("0");
  setOperator(null);
  setWaitingForOperand(false);
  setOperand(null);
};
```

### Handling Backspace

The function `handleBackspace` removes the last character from the `displayValue`.

```jsx
const handleBackspace = () => {
  setDisplayValue(displayValue.slice(0, -1) || "0");
};
```

### Handling Operators

The function `handleOperator` processes the selection of an operator. It performs any pending calculations if there is a previously entered operand and operator.

```jsx
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
};`
```

### Handling Equals

The function `handleEquals` computes the result of the current expression when the equals (`=`) button is clicked.

```jsx
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
```

### Handling Square Root

The function `handleSquareRoot` calculates the square root of the current `displayValue`.

```jsx
const handleSquareRoot = () => {
  const inputValue = parseFloat(displayValue);
  const newValue = Math.sqrt(inputValue);

  setDisplayValue(formatResult(newValue));
};
```

### Performing Calculations

The function `performCalculation` takes two operands and an operator, and performs the appropriate arithmetic operation.

```jsx
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
};`
```

### Formatting the Result

The function `formatResult` ensures that the result displayed does not exceed 10 significant digits.

```jsx
const formatResult = (value) => {
  const stringValue = value.toString();
  if (stringValue.length > 10) {
    return parseFloat(value.toPrecision(10));
  }
  return value;
};
```

### Putting It All Together

The `Calculator` component renders the display and the buttons. Each button click is handled by the `handleButtonClick` function.

```jsx
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
```

### `Button.js` and `Display.js`

Ensure the `Button` component calls the `onClick` handler passed as a prop:

```jsx
import React from "react";
import "./Button.css";

const Button = ({ label, onClick }) => {
  return (
    <button className="button" onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;`
```

The `Display` component simply shows the current value:

```jsx
import React from "react";
import "./Display.css";

const Display = ({ value }) => {
  return (
    <div className="display">
      {value}
    </div>
  );
};

export default Display;`
```

### Summary

- **State Management:** The state is managed using `useState` for `displayValue`, `operator`, `waitingForOperand`, and `operand`.
- **Button Click Handling:** Each button click is handled appropriately to update the state.
- **Calculation:** Mathematical operations are performed and results are formatted to ensure they do not exceed 10 significant digits.
- **Rendering:** The calculator UI is rendered dynamically based on the state, with buttons generated from an array of values.

This setup provides a clear, maintainable way to handle calculator logic in a React application.
