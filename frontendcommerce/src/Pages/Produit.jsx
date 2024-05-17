import React from "react";
import { useContext } from "react";
import { BoutiqueContext } from "../Contexte/BoutiqueContext";
import { useParams } from "react-router-dom";
import Breadcrum from '../Components/Breadcrums/Breadcrum';
import AfficheProduit from '../Components/AfficheProduit/AfficheProduit';
import DescriptionBox from "../Components/DescriptionBox/DescriptionBox";
import ProduitSimilaire from "../Components/ProduitSimilaire/ProduitSimilaire";
const Produit = () => {
    const {all_product}=useContext(BoutiqueContext);
    const {produitId}=useParams();
    const produit= all_product.find((e)=>e.id === Number(produitId));

    return(
        <div>
            <Breadcrum produit={produit}/>
            <AfficheProduit produit={produit}/>
            <DescriptionBox/>
            <ProduitSimilaire/>
        </div>
    )
}
export default Produit