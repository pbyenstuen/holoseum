import React, { useState } from "react";
import useSubmit from "./useSubmit";
import InputField from "./InputField";

const AdminPage = ({ api }) => {
    const [name, setName] = useState("");
    const [file, setFile] = useState();
    const [inputError, setInputError] = useState();

    const { handleSubmit: handleCreateItem, submitting, error } = useSubmit(
        async () => {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("file", file);
            await api.createItem(formData);
        }
    );

    const validateInput = (e) => {
        e.preventDefault();

        if (!name || !file) { setInputError("Fyll inn alle feltene"); return; }
        handleCreateItem(e);
    }

    return (
        <div id="contact-page-container" className="card-container">
            <div id="contact-page-card" className="card">
                <form onSubmit={validateInput}>
                    {submitting && <h4>Lagrer objekt...</h4>}
                    {error && <h4>{error.toString()}</h4>}
                    {inputError && <h4>{inputError.toString()}</h4>}
                    <div>
                        <InputField
                            label={"Navn"}
                            value={name}
                            onValueChange={setName}
                        />
                        <InputField
                            label={"3D-objekt"}
                            type={"file"}
                            name={"file"}
                            onValueChange={setFile}
                        />
                        <button className="submit-btn" type="submit" disabled={submitting}>LEGG TIL</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminPage;