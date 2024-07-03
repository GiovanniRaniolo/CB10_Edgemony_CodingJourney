import React from "react";
import style from "./Sidebar.module.css";

const Sidebar = ({ formValues }) => {
  return (
    <div className={style.sidebar}>
      <h2>Form Values</h2>
      <ul>
        <li>First Name: {formValues.fname}</li>
        <li>Last Name: {formValues.lname}</li>
        <li>Email: {formValues.email}</li>
        <li>Query Type: {formValues.queryType}</li>
        <li>Message: {formValues.message}</li>
        <li>Consent: {formValues.consent ? "Yes" : "No"}</li>
      </ul>
    </div>
  );
};

export default Sidebar;
