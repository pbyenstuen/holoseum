import React from 'react';
import { useParams } from "react-router";
import { BlockReserveLoading } from "react-loadingg";
import ErrorView from "./ErrorView";
import useLoader from "./useLoader";

const HologramView = ({ api }) => {
    const { name } = useParams();
    const { loading, error, reload } = useLoader(async () => await api.holo.getHologram(name), [name]);

    if (loading) {
        return <BlockReserveLoading />;
    }

    if (error) {
        return <ErrorView error={error} reload={reload} />;
    }

    return (
        <div id="video-container">
            <video width="100%" height="100%" controls loop autoPlay muted >
                <source src={`/api/holograms/${name}`} type="video/mp4"></source>
            </video>
        </div>
    )
}

export default HologramView;
