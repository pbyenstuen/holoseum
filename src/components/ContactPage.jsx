import React, { useState } from "react";
import InputField from "./InputField";

const ContactPage = () => {
    const [value1, setValue1] = useState("");
    const [value2, setValue2] = useState("");
    const [value3, setValue3] = useState("");

    return (
        <div id="contact-page-container" className="card-container">
            <div id="contact-page-card" className="card">
                <h2>SKJEMA</h2>
                <form>
                    <div id="input-container">
                        <InputField
                            label={"Label"}
                            value={value1}
                            placeholder={"Skriv her"}
                            onValueChange={setValue1} />
                        <InputField
                            label={"Label"}
                            value={value2}
                            placeholder={"Skriv her"}
                            onValueChange={setValue2} />
                        <InputField
                            label={"Label"}
                            value={value3}
                            placeholder={"Skriv her"}
                            onValueChange={setValue3} />
                    </div>
                    <button id="contact-submit-btn">SUBMIT</button>
                </form>
            </div>
        </div>
    )
}

export default ContactPage;