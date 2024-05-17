import React, { useEffect, useState } from "react";
import './NouvellesCollections.css'

import Article from '../Article/Article'
const NouvellesCollections = () => {
    const[nouvelle_collection,setNouvelle_collection]=useState([]);

    useEffect(()=>{
        fetch('http://localhost:4000/newcollection')
        .then((resp)=>resp.json())
        .then((data)=>setNouvelle_collection(data));
    },[])
    return(
        <div className="Nouvelles-collections">
            <h1>Nouvelles Collections</h1>
            <hr/>
            <div className="collection">
            {nouvelle_collection.map((article,i)=>{
                return <Article key={i} id={article.id} nom={article.name} image={article.image} nouveau_prix={article.new_price} ancien_prix={article.old_price} />}
            )}
            </div>
        </div>
    )
}
export default NouvellesCollections