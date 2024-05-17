import React, { useEffect, useState } from "react";
import'./Populaire.css'
import Article from '../Article/Article'
const Populaire = () => {
    const[populaireproduits,setPopulaireproduits]=useState([]);

    useEffect(()=>{
        fetch('http://localhost:4000/populairedanscollier')
        .then((resp)=>resp.json())
        .then((data)=>setPopulaireproduits(data));
    },[])
      return(
        <div className="populaire">
            <h1>POPULAIRE DANS LES COLLIERS</h1>
            <hr/>
            <div className="populaire-article">
                {populaireproduits.map((article,i)=>{
                return <Article key={i} id={article.id} nom={article.name} image={article.image} nouveau_prix={article.new_price} ancien_prix={article.old_price} n/>})}
            </div>
        </div>
    )
    
}

export default Populaire