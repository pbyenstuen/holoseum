import React from "react";

const ErrorView = ({ error, reload }) => {
  return (
    <div id="error-container" className="center-full-screen">
      <h1>Error</h1>
      <p>Noe gikk galt: {error.toString()}</p>
      {reload && <button onClick={reload}>PRØV IGJEN</button>}
    </div>
  );
}

export default ErrorView;