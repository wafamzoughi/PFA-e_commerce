import React from "react";
import './Article.css'
import { Link } from "react-router-dom";
const Article = (props) => {
    return(
        <div className="article">
            <Link to={`/produit/${props.id}`}>
                <img onClick={window.scrollTo(0,0)} src={props.image} alt="article" width="300" height="300"/>
            </Link>
            <p>{props.nom}</p>
            <div className="article-prix">
            <div className="article-nouveau-prix">
                {props.nouveau_prix}DT
            </div>
            <div className="article-ancien-prix">
                {props.ancien_prix}DT
            </div>
            </div>
        </div>
    )
}
export default Article