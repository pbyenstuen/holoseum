import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import HologramApi from "./HologramApi";

ReactDOM.render(<App api={HologramApi} />, document.getElementById("root"));