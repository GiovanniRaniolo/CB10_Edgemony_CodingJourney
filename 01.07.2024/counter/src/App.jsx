import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  const updateCount = (amount) => {
    setCount((count) => count + amount);
  };

  const setRandomCount = () => {
    setCount(Math.floor(Math.random() * 101));
  };

  return (
    <>
      <h1>Counter</h1>
      <p>count is {count}</p>
      <div className="container">
        <button
          className="sub"
          onClick={() => updateCount(-1)}
          disabled={count === 0}
        >
          -
        </button>
        <button className="add" onClick={() => updateCount(1)}>
          +
        </button>
        <button className="random" onClick={setRandomCount}>
          random
        </button>
      </div>
    </>
  );
}

export default App;
