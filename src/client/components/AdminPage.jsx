import React, { useState } from "react";
import useSubmit from "./useSubmit";
import InputField from "./InputField";

const AdminPage = ({ api }) => {
    const [name, setName] = useState("");
    const [url, setUrl] = useState("");
    const [inputError, setInputError] = useState();

    const { handleSubmit: handleCreateItem, submitting, error } = useSubmit(
        async () => {
            await api.createItem({
                name: name,
                url: url
            });
        }
    );

    const validateInput = (e) => {
        e.preventDefault();
        if (!name || !url) { setInputError("Fyll inn alle feltene"); return; }
        handleCreateItem(e);
    }

    return (
        <div id="contact-page-container" className="card-container">
            <div id="contact-page-card" className="card">
                <form onSubmit={validateInput}>
                    {submitting && <h4>Lagrer objekt...</h4>}
                    {error && <h4>{error.toString()}</h4>}
                    {inputError && <h4>{inputError.toString()}</h4>}
                    <InputField
                        label={"Name"}
                        value={name}
                        onValueChange={setName}
                    />
                    <InputField
                        label={"URL"}
                        value={url}
                        onValueChange={setUrl}
                    />
                    <button className="submit-btn" type="submit" disabled={submitting}>LEGG TIL</button>
                </form>
            </div>
        </div>
    );
};

export default AdminPage;