import React from "react";
import './ArticlesPanier.css'
import { useContext } from "react";
import { BoutiqueContext } from "../../Contexte/BoutiqueContext";
import supp_icon from '../Assets/panier-supp.png'
const ArticlesPanier = () => {
    const{getMontantTotalPanier,all_product,articlesPanier,supprimerDuPanier}= useContext(BoutiqueContext);
    return(
        <div className="articlepanier">
            <div className=" articlesPanier-format-main ">
            <p>Produit</p>
            <p>Titre</p>
            <p>Prix</p>
            <p>Quantité</p>
            <p>Totale</p>
            <p>Spprimer</p>
            </div>
            <hr/>
           {all_product.map((e , index)=>{
            if(articlesPanier[e.id]>0)
            {
                return ( <div key={index}>
                <div className="articlesPanier-format articlesPanier-format-main">
                    <img src={e.image} alt="" className="iconpanier-produit-icon" />
                    <p>{e.name}</p>
                    <p>{e.new_price}DT</p>
                    <button className="articlesPanier-quantité">{articlesPanier[e.id]}</button>
                    <p>{e.new_price*articlesPanier[e.id]}DT</p>
                    <img className="articlesPanier-remove-icon" src={supp_icon} alt="supp_icon" onClick={()=>{supprimerDuPanier(e.id)}}/>
                </div>
            </div>
                );
           }
           return null; })}
           <div className="articlesPanier-bas">
                <div className="articlesPanier-total">
                    <h1>Totaux du Panier</h1>
                    <div > 
                        <div className="articlesPanier-total-article">
                            <p>Sous-total</p>
                            <p>{getMontantTotalPanier()}DT</p>
                        </div>
                        <hr/>
                        <div className="articlesPanier-total-article">
                            <p>Frais de Livraison</p>
                            <p>8DT</p>
                        </div>
                        <hr/>
                        <div className="articlesPanier-total-article">
                            <h3>Total</h3>
                            <h3>{getMontantTotalPanier()+8}DT</h3>
                        </div>
                    </div>
                    <button>Passer à la caisse</button>
                </div>
                <div className="articlesPanier-codepromo">
                    <p>Si vous avez un code promo, entrez-le ici</p>
                    <div className="articlesPanier-promobox">
                        <input  type="text" placeholder="Code Promo"/>
                        <button>Envoyer</button>
                    </div>
                </div>

           </div>
        </div>
    )
}
export default ArticlesPanier