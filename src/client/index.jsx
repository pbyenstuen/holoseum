import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import ItemApi from "./ItemApi";

ReactDOM.render(<App api={ItemApi} />, document.getElementById("root"));