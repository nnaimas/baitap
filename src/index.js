import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Form1 from "./form1";
import Form2 from "./form2";
import Form3 from "./form3";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <p>Using useState hook</p>
    <Form1 />
    <p>Using useRef hook</p>
    <Form2 />
    <p>Using React hook form</p>
    <Form3/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
