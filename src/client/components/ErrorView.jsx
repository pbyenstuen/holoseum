import React from "react";

const ErrorView = ({ error, reload }) => {
  return (
    <>
      <div>Noe gikk galt: {error.toString()}</div>
      {reload && <button onClick={reload}>PRØV IGJEN</button>}
    </>
  );
}

export default ErrorView;