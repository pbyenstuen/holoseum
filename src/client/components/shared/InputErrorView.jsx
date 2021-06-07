import React from "react";

const InputErrorView = ({ error }) => {
    return (
        <div id="input-error-view">
            <i className="fa fa-exclamation" title="Utropstegn" aria-label="Utropstegn"></i>
            <h4>
                {error.toString()}
            </h4>
        </div>
    );
}

export default InputErrorView;