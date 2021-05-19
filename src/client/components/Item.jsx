import React from 'react';
import { useParams } from "react-router";
//import useLoader from "./useLoader";
import axios from 'axios';
//import { response } from 'express';

const Item = ({ api }) => {
    const { name } = useParams();
    console.log(name);
    let hollowgramObj;

    

    //const { data: item, loading, error, reload } = useLoader(async () => await api.getItem(name), [name]);

    /*if (loading) {
        return <h2>Loading item...</h2>
    }*/

    //Henter hollogramObj fra webapi og consol logger
    axios.get(`https://localhost:5001/objecthollowgram/${name}`)
        .then( res => {
            hollowgramObj = res.data;
            console.log(hollowgramObj);
        })
    

    return (
        <div>
            <h1>{name}</h1>
            <h2>url: </h2>
        </div>
    )
}


export default Item;
