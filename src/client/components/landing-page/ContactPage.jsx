import React, { useState } from "react";
import InputErrorView from "../shared/InputErrorView";
import InputField from "../shared/InputField";

const ContactPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [inputError, setInputError] = useState("");

    const validateInput = (e) => {
        e.preventDefault();
        if (!name || !email || !message) {
            setInputError("Vennligst fyll inn alle feltene");
            return;
        }
        setInputError("");
        setName("");
        setEmail("");
        setMessage("");
    }

    return (
        <div id="contact-page-container" className="card-container">
            <div id="contact-page-card" className="card">
                <h2>KONTAKT OSS</h2>
                <form onSubmit={validateInput}>
                    {inputError && <InputErrorView error={inputError} />}
                    <div id="input-container">
                        <div id="input-container-left">
                            <InputField
                                label={"Navn"}
                                name={"name"}
                                value={name}
                                onValueChange={setName} />
                            <InputField
                                type={"email"}
                                name={"email"}
                                label={"E-postadresse"}
                                value={email}
                                onValueChange={setEmail} />
                            <button id="contact-submit-btn">SEND</button>
                        </div>
                        <div id="textarea-container">
                            <label>Melding</label>
                            <textarea
                                name="message"
                                placeholder="Skriv en melding til oss her!"
                                value={message} onChange={(e) => setMessage(e.target.value)} />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ContactPage;