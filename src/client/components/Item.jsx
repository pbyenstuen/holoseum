import React from 'react';
import { useParams } from "react-router";
import useLoader from "./useLoader";

const Item = ({ api }) => {
    const { name } = useParams();
    const { data, loading, error, reload } = useLoader(async () => await api.getItem(name), [name]);

    if (loading) {
        return <h2>Loading item...</h2>
    }

    return (
        <div>
            <iframe src="/api/items/vid"></iframe>
        </div>
    )
}

export default Item;
