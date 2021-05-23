import React, { useState } from "react";
import useSubmit from "./useSubmit";
import InputField from "./InputField";

const AdminPage = ({ api }) => {
    const [name, setName] = useState("");
    const [file, setFile] = useState();
    const [status, setStatus] = useState();

    const { handleSubmit: handleCreateItem, submitting, error } = useSubmit(
        async () => {
            setStatus("");
            const formData = new FormData();
            formData.append("name", name);
            formData.append("file", file);
            await api.uploadHologram(formData);
        },
        () => {
            setStatus("Opplasting fullført!")
            setName("");
        }
    );

    const validateInput = (e) => {
        e.preventDefault();
        if (!name || !file) { setStatus("Fyll inn alle feltene"); return; }
        handleCreateItem(e);
    }

    return (
        <div id="contact-page-container" className="card-container">
            <div id="contact-page-card" className="card">
                {submitting ? <h4>Laster opp...</h4> :
                    <form onSubmit={validateInput}>
                        {error && <h4>{error.toString()}</h4>}
                        {status && <h4>{status.toString()}</h4>}
                        <div>
                            <InputField
                                label={"Navn"}
                                value={name}
                                onValueChange={setName}
                            />
                            <InputField
                                label={"Hologram"}
                                type={"file"}
                                name={"file"}
                                onValueChange={setFile}
                            />
                            <button className="submit-btn" type="submit">LAST OPP</button>
                        </div>
                    </form>
                }
            </div>
        </div>
    );
};

export default AdminPage;