import React from "react";
import './Modèle.css'
import Byfoufaaa from "../Assets/Byfoufaaa.mp4";
import arrow from "../Assets/arrow.png";
const Modèle = () => {
    return(
        <div className="modèle">
            <div className="modèle-gauche">
                <h2>NOUVEAUX ARRIVANTS</h2>
                <div>
                    <div >
                        <p>Nouvelles</p>
                    </div>
                    <p>Collections</p>
                    

                </div>
                <div className="modèle-dernier-btn">
                <div>Latest Collection</div>
                <img src={arrow} alt="bouton" />
                </div>
            </div>
            <div className="modèle-droite">
            <video controls autoPlay  width="500" height="400" >
                            <source src={Byfoufaaa} type="video/mp4"  />
                        </video>
                
            </div>
        </div>
    )
}
export default Modèle