import { useState } from "react";
import "./App.css";
import Switch from "./components/Switch";
import RangeSlider from "./components/RangeSlider";

function App() {
  const [value, setValue] = useState(false);
  const [sliderValue, setSliderValue] = useState(100000);
  const [calculationResult, setCalculationResult] = useState(12.99);

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
    return parseFloat(result.toFixed(2));
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

  // Calcola lo stile dinamico per il background del slider
  const sliderPercentage = (sliderValue / 200000) * 100;
  const sliderStyle = {
    background: `linear-gradient(90deg, var(--soft-cyan) ${sliderPercentage}%, var(--light-grayish-blue) ${sliderPercentage}%)`,
  };

  return (
    <>
      {/* Header START */}
      <div className="header-container">
        <h1>Simple, traffic-based pricing</h1>
        <p>Sign-up for 30-day trial. No credit card requird.</p>
      </div>
      {/* Header END */}
      <div className="app">
        {/* Results Start */}
        <div className="slider-container">
          {calculationResult !== null && (
            <div className="result">
              <div className="total">
                <p>/ month</p>
                <h2>${calculationResult}</h2>
              </div>
              <div className="views">
                <h3>{abbreviateNumber(sliderValue)}</h3>
              </div>
            </div>
          )}
          {/* Results End */}
          <RangeSlider
            min={0}
            max={200000}
            value={sliderValue}
            onChange={handleSliderChange}
            style={sliderStyle}
          />
        </div>
        {/* Switch Start */}
        <div className="switch-container">
          <p>Monthly Billing</p>
          <Switch isOn={value} handleToggle={handleToggle} />
          <p>
            Yearly Billing
            <span className="discount">25% discount</span>
          </p>
        </div>
        {/* Switch End */}
        <hr className="horizontal-line" />
        {/* Card-Footer Start */}
        <div className="card-footer">
          <div className="features">
            <ul className="features-list">
              <li>&nbsp;&nbsp;&nbsp;&nbsp;Unlimited website</li>
              <li>&nbsp;&nbsp;&nbsp;&nbsp;100% data ownership</li>
              <li>&nbsp;&nbsp;&nbsp;&nbsp;email reports</li>
            </ul>
          </div>
          <div className="start">
            <button>Start my trial</button>
          </div>
        </div>
        {/* Card-Footer End */}
      </div>
    </>
  );
}

export default App;
