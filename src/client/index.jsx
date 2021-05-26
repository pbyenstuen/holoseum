import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import AppApi from "./AppApi";

ReactDOM.render(<App api={AppApi} />, document.getElementById("root"));