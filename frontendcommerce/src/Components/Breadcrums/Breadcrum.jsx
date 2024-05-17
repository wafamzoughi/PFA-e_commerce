import React from "react";
import './Breadcrum.css'
import arrow_icon from '../Assets/breadcrum_arrow.png'
const Breadcrum = (props) => {
    const {produit}= props;
    return(
        <div className="breadcrum">
            BOUTIQUE <img src={arrow_icon} alt="arrow_icon"/>  {produit.category} <img src={arrow_icon} alt="arrow_icon"/> {produit.name}

        </div>
    )
}
export default Breadcrum