import React, { useState } from "react";
import Form from "./components/Form";

const App = () => {
  const [formValues, setFormValues] = useState({
    fname: "",
    lname: "",
    email: "",
    message: "",
    queryType: "",
    consent: false,
  });

  const handleInputChange = (event) => {
    const { id, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormValues({
      ...formValues,
      [id]: newValue,
    });
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1 }}>
        <Form formValues={formValues} handleInputChange={handleInputChange} />
      </div>
    </div>
  );
};

export default App;
