import React, { useContext } from "react";
import'./CSS/BoutiqueCatégorie.css'
import Article from "../Components/Article/Article";
import { BoutiqueContext } from "../Contexte/BoutiqueContext";

const BoutiqueCatégorie = (props) => {
    const{all_product} = useContext(BoutiqueContext);

    return(
        <div className="boutique-catégorie">
        
            <div className="boutiquecatégorie-produits">
            {all_product.map((article,i)=>{
                if(props.category===article.category){
                    return <Article key={i} id={article.id} nom={article.name} image={article.image} nouveau_prix={article.new_price} ancien_prix={article.old_price} />
                }
                else{
                    return null;
                }
            })}
            </div>
            <div className="boutiquecatégorie-chargerplus">
                Charger Plus
            </div>
        </div>
    )
    
}
export default BoutiqueCatégorie
