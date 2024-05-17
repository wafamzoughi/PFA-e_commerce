import React from "react";
import './DescriptionBox.css'
const DescriptionBox = () => {
    return(
        <div className="descriptionbox">
            <div className="descriptionbox-navigateur">
                <div className="descriptionbox-nav-box">
                    Description
                </div>
                <div className="descriptionbox-nav-box">
                    Reviews
                </div>
            </div>
            <div className="descriptionbox-description">
                <p>
                    Un site e-commerce, abréviation de site de commerce électronique, est une plateforme en ligne dédiée à la vente de produits, qu’ils soient des biens ou des services. 
                </p>
                <p>
                Le site e-commerce offre donc aux consommateurs la possibilité de parcourir un catalogue virtuel de produits ou services, d’ajouter des articles à leur panier d’achat, et de finaliser leurs achats en effectuant des transactions électroniques sécurisées.
                </p>
            </div>
        </div>
    )
}
export default DescriptionBox