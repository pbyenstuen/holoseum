import React, { useState } from "react";
import InputField from "../shared/InputField";

const ContactPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    return (
        <div id="contact-page-container" className="card-container">
            <div id="contact-page-card" className="card">
                <h2>KONTAKT OSS</h2>
                <form>
                    <div id="input-container">
                        <InputField
                            label={"Navn"}
                            value={name}
                            onValueChange={setName} />
                        <InputField
                            label={"E-postadresse"}
                            value={email}
                            onValueChange={setEmail} />
                        <label>Melding</label>
                        <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
                    </div>
                    <button id="contact-submit-btn">SEND</button>
                </form>
            </div>
        </div>
    )
}

export default ContactPage;