import React from 'react';
import useSubmit from "../../hooks/useSubmit";

const HologramList = ({ api, holograms, loading, error, updateList }) => {

    const { handleSubmit: handleDeleteHologram, submitting } = useSubmit(
        async (data) => {
            const name = data;
            await api.holo.deleteHologram({ name });
        },
    );

    const handleClick = (e, name) => {
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
            }
        </section>
    )
}

export default HologramList;