import React, { useState } from "react";
import useSubmit from "./useSubmit";
import InputField from "./InputField";

const UploadForm = ({ api, updateList }) => {
    const [name, setName] = useState("");
    const [file, setFile] = useState();
    const [status, setStatus] = useState();

    const { handleSubmit: handleUpload, submitting, error } = useSubmit(
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
            updateList();
        }
    );

    const validateInput = (e) => {
        e.preventDefault();
        if (!name || !file) { setStatus("Fyll inn alle feltene"); return; }
        handleUpload(e);
    }

    return (
        <section id="upload-form-container">
            <h2>Last opp hologram</h2>
            <div id="upload-form-card" className="card">
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
                            <button type="submit">LAST OPP</button>
                        </div>
                    </form>
                }
            </div>
        </section>

    );
};

export default UploadForm;