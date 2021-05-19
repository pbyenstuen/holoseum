import React from 'react';
import { useParams } from "react-router";
import useLoader from "./useLoader";

const Item = ({ api }) => {
    const { name } = useParams();
    const { data: item, loading, error, reload } = useLoader(async () => await api.getItem(name), [name]);

    if (loading) {
        return <h2>Loading item...</h2>
    }

    return (
        <div>
            <h1>{item.name}</h1>
            <h2>url: {item.url}</h2>
        </div>
    )
}

export default Item;
