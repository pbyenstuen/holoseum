import React, { useState } from 'react';
import useSubmit from "../../hooks/useSubmit";

const HologramList = ({ api, holograms, loading, error, updateList }) => {
    const [fileToDelete, setFileToDelete] = useState("");

    const { handleSubmit: handleDeleteHologram, submitting } = useSubmit(
        async (data) => {
            const name = data;
            await api.holo.deleteHologram({ name });
        },
    );

    const handleDeleteClick = (e, name) => {
        handleDeleteHologram(e, name)
        updateList();
    }

    return (
        <section id="hologram-list-container">
            <h2>Opplastinger</h2>
            {loading ?
                <h4>Laster...</h4>
                :
                <div>
                    {!error ?
                        holograms.map(({ _id, metadata: name }) => (
                            <article key={_id} className={fileToDelete === name ? "marked-for-deletion" : ""}>
                                {fileToDelete !== name ?
                                    <>
                                        <p className="holo-name">{`${name.charAt(0).toUpperCase()}${name.slice(1)}`}</p>
                                        <button className="prep-del-btn" onClick={() => setFileToDelete(name)}>
                                            <i className="fa fa-trash fa-2x" title="Slett" aria-label="Slett"></i>
                                        </button>
                                    </>
                                    :
                                    <>
                                        <p>Vil du slette {`${name.charAt(0).toUpperCase()}${name.slice(1)}`}?</p>
                                        <button className="confirm-del-btn del-btn" disabled={submitting} onClick={(e) => handleDeleteClick(e, name)}>
                                            <i className="fa fa-check fa-2x" title="Ja" aria-label="Ja"></i>
                                        </button>
                                        <button className="decline-del-btn del-btn" disabled={submitting} onClick={() => setFileToDelete("")}>
                                            <i className="fa fa-times fa-2x" title="Nei" aria-label="Nei"></i>
                                        </button>
                                    </>
                                }
                            </article>
                        ))
                        :
                        <p>
                            <i>
                                Ingenting å vise
                            </i>
                        </p>
                    }
                </div>
            }
        </section>
    )
}

export default HologramList;