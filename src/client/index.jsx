import React from "react";
import ReactDOM from "react-dom";
import HoloseumApp from "./components/HoloseumApp";
import HoloseumApi from "./HoloseumApi";

ReactDOM.render(<HoloseumApp api={HoloseumApi} />, document.getElementById("root"));