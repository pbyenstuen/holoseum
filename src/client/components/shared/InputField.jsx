import React from "react";

const InputField = ({ value, onValueChange, type = "text", label = "", name, placeholder, className }) => {
    return (
        <>
            <label>
                {label}{" "}
                <input
                    className={className ? className : null}
                    name={name ? name : null}
                    type={type}
                    value={value}
                    placeholder={placeholder ? placeholder : null}
                    onChange={(e) => onValueChange(type === "file" ? e.target.files[0] : e.target.value)}
                />
            </label>
        </>
    )
}

export default InputField;