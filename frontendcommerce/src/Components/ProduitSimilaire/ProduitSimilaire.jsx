import React from "react";
import'./ProduitSimilaire.css'
import données from "../Assets/data";
import Article from '../Article/Article'
const ProduitSimilaire = () => {
    return(
        <div className="produitsimilaire">
            <h1>Vous pourriez aussi aimer</h1>
            <hr/>
            <div className="produitsimilaire-article">
                {données.map((article,i)=>{
                    return <Article key={i} id={article.id} nom={article.name} image={article.image} nouveau_prix={article.new_price} ancien_prix={article.old_price} />
                })}
            </div>
        </div>
    )
}
export default ProduitSimilaire