import React, { useContext } from "react";
import'./AfficheProduit.css';
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { BoutiqueContext } from "../../Contexte/BoutiqueContext";
const AfficheProduit = (props) => {
        const {produit}=props;
        const{ajouterAuPanier}=useContext(BoutiqueContext);
    return(
        <div className="afficheproduit">
            <div className="afficheproduit-gauche">
                <div className="afficheproduit-img-list">
                    <img src={produit.image} alt="" />
                    <img src={produit.image} alt="" />
                    <img src={produit.image} alt="" />
                    <img src={produit.image} alt="" />
                </div>
                <div className="afficheproduit-img">
                    <img className="afficheproduit-main-img" src={produit.image} alt=""/>
                </div>
            </div>
            <div className="afficheproduit-droite">
                <h1>{produit.name}</h1>
                <div className="afficheproduit-droite-star">
                    <img src={star_icon} alt=""/>
                    <img src={star_icon} alt=""/>
                    <img src={star_icon} alt=""/>
                    <img src={star_icon} alt=""/>
                    <img src={star_dull_icon} alt=""/>
                    <p>(122)</p>
                </div>
                <div className="afficheproduit-droite-prix">
                    <div className="afficheproduit-droite-ancien-prix">
                        {produit.old_price}DT
                    </div>
                    <div className="afficheproduit-droite-nouveau-prix">
                        {produit.new_price}DT
                    </div>
                    <div className="afficheproduit-droite-description">

                    </div>
                </div>
            <button onClick={()=>{ajouterAuPanier(produit.id)}}>Ajouter au panier</button>
                
            </div>
        </div>
    )
}
export default AfficheProduit