import React from "react";
import Modèle from "../Components/Modèle/Modèle";
import Populaire from "../Components/Populaire/Populaire";
import Offre from "../Components/Offre/Offre";
import NouvellesCollections from "../Components/NouvellesCollections/NouvellesCollections";
import Newsletter from "../Components/Newsletter/Newsletter";
const Boutique = () => {
    return(
        <div>
            <Modèle/>
            <Populaire/>
            <Offre/>
            <NouvellesCollections/>
            <Newsletter/>
        </div>
    )
}
export default Boutique