import React, { usteState, useEffect } from 'react';
import ErrorView from "./ErrorView";
import { useParams } from "react-router";
import useLoader from "./useLoader";

const Hologram = ({ api }) => {
    const { name } = useParams();
    const { loading, error, reload } = useLoader(async () => await api.getHologram(name), [name]);

    if (loading) {
        return <h2>Laster...</h2>
    }

    if (error) {
        return <ErrorView error={error} reload={reload} />;
    }

    return (
        <video width="100%" height="100%" controls loop autoPlay muted>
            <source src={`/api/holograms/${name}`} type="video/mp4"></source>
        </video>
    )
}

export default Hologram;
