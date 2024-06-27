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

## How to Add More Buttons

To add more buttons, simply update the `buttonValues` array in `Calculator.js` with the new values. The UI will automatically reflect these changes, but you have to update the logic for the added button.

`const buttonValues = [
  "7", "8", "9", "/",
  "4", "5", "6", "*",
  "1", "2", "3", "-",
  "0", ".", "=", "+",
  "%", "C", "←", "√"
];`
