import React from "react";
import style from "./Results.module.css";

function Results(props) {
  return (
    <div className="results">
      <h2>Your results</h2>
      <p>Your results are shown below based on the information you provided.</p>
      <div className={style.resultSection}>
        <h3>Your monthly repayments</h3>
        <p className={style.resultAmount}>£{props.monthlyPayment}</p>
        <hr />
        <p>Total you'll repay over the term</p>
        <p className={style.resultTotal}>£{props.totalRepay}</p>
      </div>
    </div>
  );
}
export default Results;
