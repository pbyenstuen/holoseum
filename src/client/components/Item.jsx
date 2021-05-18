import React from 'react';
import { useParams } from "react-router";
import useLoader from "./useLoader";

const Item = ({ api }) => {
    const { id } = useParams();
    const { data: item, loading, error, reload } = useLoader(async () => await api.getItem(id), [id]);

    if (loading) {
        return <h2>Loading item...</h2>
    }

    return (
        <div>
            <h2>url: {item.url}</h2>
        </div>
    )
}

export default Item;
