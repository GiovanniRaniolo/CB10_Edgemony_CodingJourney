import React, { useState } from "react";
import style from "./Form.module.css";
import Sidebar from "./Sidebar";

const Form = () => {
  const [formValues, setFormValues] = useState({
    fname: "",
    lname: "",
    email: "",
    message: "",
    queryType: "",
    consent: false,
  });

  const handleInputChange = (event) => {
    const { id, value, type, checked, name } = event.target;
    const newValue = type === "checkbox" ? checked : value;

    // Special handling for radio inputs
    if (type === "radio") {
      if (checked) {
        setFormValues({
          ...formValues,
          [name]: value,
        });
      }
    } else {
      setFormValues({
        ...formValues,
        [id]: newValue,
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValues);
  };

  return (
    <>
      <div className={style.container}>
        <h1>Contact Us</h1>
        <form onSubmit={handleSubmit}>
          <div className={style.row}>
            <div className={style.labelInputContainer}>
              <label htmlFor="fname">First Name</label>
              <input
                type="text"
                id="fname"
                value={formValues.fname}
                onChange={handleInputChange}
                required
                autoComplete="off"
              />
            </div>

            <div className={style.labelInputContainer}>
              <label htmlFor="lname">Last Name</label>
              <input
                type="text"
                id="lname"
                value={formValues.lname}
                onChange={handleInputChange}
                required
                autoComplete="off"
              />
            </div>
          </div>

          <div>
            <div className={style.labelInputContainer}>
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={formValues.email}
                onChange={handleInputChange}
                required
                autoComplete="off"
              />
            </div>
          </div>

          <div className={style.row}>
            <div className={style.labelInputContainer}>
              <label>Query Type</label>
              <div className={style.radioGroup}>
                <div className={style.radioOption}>
                  <input
                    type="radio"
                    id="general"
                    name="queryType"
                    value="General Enquiry"
                    checked={formValues.queryType === "General Enquiry"}
                    onChange={handleInputChange}
                    required
                  />
                  <label htmlFor="general">General Enquiry</label>
                </div>

                <div className={style.radioOption}>
                  <input
                    type="radio"
                    id="support"
                    name="queryType"
                    value="Support Request"
                    checked={formValues.queryType === "Support Request"}
                    onChange={handleInputChange}
                    required
                  />
                  <label htmlFor="support">Support Request</label>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className={style.labelInputContainer}>
              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                value={formValues.message}
                onChange={handleInputChange}
                required
                autoComplete="off"
                rows={4}
              />
            </div>
          </div>

          <div className={style.row}>
            <div className={style.checkBox}>
              <label>
                <input
                  type="checkbox"
                  id="consent"
                  checked={formValues.consent}
                  onChange={handleInputChange}
                  required
                />
                I consent to being contacted by the team
              </label>
            </div>
          </div>

          <div className={style.row}>
            <input type="submit" value="Submit" required />
          </div>
        </form>
      </div>
      <Sidebar formValues={formValues} />
    </>
  );
};

export default Form;
