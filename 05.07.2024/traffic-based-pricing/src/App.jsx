import { useState } from "react";
import "./App.css";
import Switch from "./components/Switch";
import RangeSlider from "./components/RangeSlider";

function App() {
  const [value, setValue] = useState(false);
  const [sliderValue, setSliderValue] = useState(100000);
  const [calculationResult, setCalculationResult] = useState(12.99);

  // Funzione per eseguire il calcolo iniziale
  const performInitialCalculation = (value) => {
    const result = performCalculation(sliderValue);
    setCalculationResult(result);
  };

  const handleSliderChange = (value) => {
    setSliderValue(value);
    const result = performCalculation(value);
    setCalculationResult(result);
  };

  const performCalculation = (sliderValue) => {
    // Calcola in base al valore dello switch
    const baseCostPerView = 0.00013;
    const discountedCostPerView = baseCostPerView * 0.75; // Sconto del 25%
    const costPerView = value ? discountedCostPerView : baseCostPerView;
    const result = sliderValue * costPerView;
    return parseFloat(result.toFixed(2)); //
  };

  const handleToggle = () => {
    const newValue = !value;
    setValue(newValue);
    // Aggiorna il calcolo quando lo switch cambia
    const result = performCalculation(sliderValue);
    setCalculationResult(result);
  };

  const abbreviateNumber = (number) => {
    if (number >= 1000) {
      return (number / 1000).toFixed(1) + "K PAGEVIEWS";
    }
    return number.toString();
  };

  return (
    <>
      <div className="app">
        <div className="slider-container">
          {calculationResult !== null && (
            <div className="result">
              <div className="total">
                <p>/month</p>
                <h2>${calculationResult}</h2>
              </div>
              <div className="views">
                <h3>{abbreviateNumber(sliderValue)}</h3>
              </div>
            </div>
          )}
          <RangeSlider
            min={0}
            max={200000}
            value={sliderValue}
            onChange={handleSliderChange}
          />
        </div>
        <div className="switch-container">
          <p>Monthly Billing</p>
          <Switch isOn={value} handleToggle={handleToggle} />
          <p>
            Yearly Billing
            <span className="discount">25% discount</span>
          </p>
        </div>
      </div>
    </>
  );
}

export default App;
