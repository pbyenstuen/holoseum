import React, { useState } from 'react';
import useSubmit from "./useSubmit";

const HologramList = ({ api, holograms, loading, error, updateList }) => {
    const [name, setName] = useState("fg");

    const { handleSubmit: handleDeleteHologram, submitting } = useSubmit(
        async () => {
            console.log("hoh", name)
            await api.deleteHologram({ name });
        }
    );

    const handleClick = (e, name) => {
        setName(name);
        handleDeleteHologram(e);
        updateList();
    }

    return (
        <section id="hologram-list-container">
            <h2>Opplastinger</h2>
            {!loading ?
                <div>
                    {!error ?
                        holograms.map(({ _id, metadata: name }) => (
                            <article key={_id}>
                                <p>{`${name.charAt(0).toUpperCase()}${name.slice(1)}`}</p>
                                <button id="del-btn" onClick={(e) => handleClick(e, name)} disabled={submitting}>SLETT</button>
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
                :
                <p>Laster...</p>
            }
        </section>
    )
}

export default HologramList;