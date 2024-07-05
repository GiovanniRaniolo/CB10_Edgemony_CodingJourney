import { useEffect, useState } from "react";
import style from "./App.module.css";
import calculateIcon from "./assets/icon-calculator.svg";
import illustration from "./assets/illustration-empty.svg";
import Results from "./components/Results.jsx";

function App() {
  const initialMortgageState = {
    mortgageAmount: "",
    mortgageTerm: "",
    interestRate: "",
    paymentType: "repayment",
  };

  const [mortgageData, setMortgageData] = useState({ ...initialMortgageState });
  const [showResults, setShowResults] = useState(false);
  const [monthlyPayment, setMonthlyPayment] = useState("");
  const [totalRepay, setTotalRepay] = useState("");
  const [isFocused, setIsFocused] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMortgageData({
      ...mortgageData,
      [name]: value,
    });
  };

  const calculateMonthlyRepayments = () => {
    const { mortgageAmount, mortgageTerm, interestRate, paymentType } =
      mortgageData;

    const amount = parseFloat(mortgageAmount);
    const term = parseFloat(mortgageTerm);
    const rate = parseFloat(interestRate) / 100;

    let monthlyPayment = 0;
    if (paymentType === "repayment") {
      monthlyPayment =
        (amount * rate) / (12 * (1 - Math.pow(1 + rate / 12, -term)));
    } else {
      monthlyPayment = (amount * rate) / 12;
    }

    const totalRepay = monthlyPayment * term;

    return {
      monthlyPayment: monthlyPayment.toFixed(2),
      totalRepay: totalRepay.toFixed(2),
    };
  };

  const handleCalculate = () => {
    const results = calculateMonthlyRepayments();
    setShowResults(true);
    setMonthlyPayment(results.monthlyPayment);
    setTotalRepay(results.totalRepay);
  };

  const handleClearAll = () => {
    setMortgageData({ ...initialMortgageState });
    setShowResults(false);
    setMonthlyPayment("");
    setTotalRepay("");
  };

  const handleFocusCapture = (inputFocused) => {
    if (inputFocused !== undefined) {
      setIsFocused(inputFocused);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.calculator}>
        <div className={style.title}>
          <h1>Mortgage Calculator</h1>
          <span className={style.clear} onClick={handleClearAll}>
            Clear All
          </span>
        </div>
        <div className={style.inputGroup}>
          <label htmlFor="amount">Mortgage Amount</label>
          <div className={style.inputWithIcon}>
            <span
              className={`${style.spanAmount} ${
                isFocused === "mortgageAmount" ? style.focused : ""
              }`}
            >
              £
            </span>
            <input
              type="number"
              name="mortgageAmount"
              value={mortgageData.mortgageAmount}
              onChange={handleInputChange}
              onFocusCapture={() => handleFocusCapture("mortgageAmount")}
              onBlurCapture={() => handleFocusCapture("")}
              className={style.amount}
            />
          </div>
          <div className={style.yearsPercent}>
            <div className={style.inputGroup}>
              <label htmlFor="years">Mortgage Term</label>
              <div className={style.inputWithIcon}>
                <span
                  className={`${style.spanAmount} ${
                    isFocused === "mortgageTerm" ? style.focused : ""
                  }`}
                >
                  years
                </span>
                <input
                  type="number"
                  name="mortgageTerm"
                  value={mortgageData.mortgageTerm}
                  onChange={handleInputChange}
                  onFocusCapture={() => handleFocusCapture("mortgageTerm")}
                  onBlurCapture={() => handleFocusCapture("")}
                  className={style.term}
                />
              </div>
            </div>

            <div className={style.inputGroup}>
              <label htmlFor="percent">Interest Rate</label>
              <div className={style.inputWithIcon}>
                <span
                  className={`${style.spanAmount} ${
                    isFocused === "interestRate" ? style.focused : ""
                  }`}
                >
                  %
                </span>
                <input
                  type="number"
                  name="interestRate"
                  value={mortgageData.interestRate}
                  onChange={handleInputChange}
                  onFocusCapture={() => handleFocusCapture("interestRate")}
                  onBlurCapture={() => handleFocusCapture("")}
                  className={style.rate}
                />
                <div />
              </div>
            </div>
          </div>

          <div className={style.radioButton}>
            <label className="type">Mortgage Type</label>
            <div className={style.radioContainer}>
              <label>
                <input
                  type="radio"
                  name="paymentType"
                  value="repayment"
                  checked={mortgageData.paymentType === "repayment"}
                  onChange={handleInputChange}
                />
                Repayment
              </label>
              <label>
                <input
                  type="radio"
                  name="paymentType"
                  value="interestOnly"
                  checked={mortgageData.paymentType === "interestOnly"}
                  onChange={handleInputChange}
                />
                Interest Only
              </label>
            </div>
          </div>
          <button className={style.calculateButton} onClick={handleCalculate}>
            <img
              src={calculateIcon}
              alt="Calculate Icon"
              className={style.buttonIcon}
            />
            Calculate Repayments
          </button>
        </div>
      </div>
      <div className={`${style.results} ${showResults ? style.show : ""}`}>
        {!showResults && (
          <>
            <img src={illustration} alt="" />
            <h2>Results shown here</h2>
            <p>
              Complete the form and click "calculate repayments to see what your
              monthly repayments would be
            </p>
          </>
        )}
        {showResults && (
          <Results monthlyPayment={monthlyPayment} totalRepay={totalRepay} />
        )}
      </div>
    </div>
  );
}

export default App;
