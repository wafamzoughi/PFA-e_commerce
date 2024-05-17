import React from "react";
import './Offre.css'
import exclusive from '../Assets/exclusive.jpg'
const Offre = () => {
    return(
        <div className="offre">
            <div className="offre_gauche">
                <h1>Exclusive</h1>
                <h2>Des offres pour vous</h2>
                <button>Commander Maintenant</button>
            </div>
            <div className="offre_droite">
                <img src={exclusive} alt="sac" width="300" height="350" />
            </div>
        </div>
    )
}
export default Offre