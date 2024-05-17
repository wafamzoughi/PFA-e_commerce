import React from "react";
import './Sidebar.css';
import{Link} from 'react-router-dom';
import ajouter_produit_panier from '../../assets/Panier_produit.svg';
import liste_produit from '../../assets/liste_produit.svg';
const Sidebar = () => {
    return(
        <div className="sidebar">
            <Link to={'/ajouterproduit'} style={{textDecoration:"none"}}>
                <div className="sidebar-item">
                    <img src={ajouter_produit_panier} alt=""/>
                    <p>Ajouter Produit</p>
                </div>
            </Link>
            <Link to={'/listeproduit'} style={{textDecoration:"none"}}>
                <div className="sidebar-item">
                    <img src={liste_produit} alt=""/>
                    <p>Liste de Produit</p>
                </div>
            </Link>
        </div>
    )
}
export default Sidebar