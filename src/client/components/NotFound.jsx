import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div id="not-found-container" className="center-full-screen">
      <h1>404</h1>
      <p>Siden du lette etter finnes ikke</p>
      <Link to="/">Klikk her for å gå til hovedsiden</Link>
    </div>
  );
};

export default NotFound;
