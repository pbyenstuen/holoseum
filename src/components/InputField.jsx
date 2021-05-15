import React from "react";

const InputField = ({ value, onValueChange, type = "text", label = "", placeholder, className }) => {
    return (
        <div>
            <label>
                {label}{" "}
                <input
                    className={className ? className : null}
                    type={type}
                    value={value}
                    placeholder={placeholder ? placeholder : null}
                    onChange={(e) => onValueChange(e.target.value)}
                />
            </label>
        </div>
    )
}

export default InputField;