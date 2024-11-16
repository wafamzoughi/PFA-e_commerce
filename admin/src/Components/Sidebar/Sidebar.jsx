import React from "react";
import './Sidebar.css';
import{Link} from 'react-router-dom';
import ajouter_produit_panier from '../../assets/Panier_produit.svg';
import liste_produit from '../../assets/liste_produit.svg';
import users from'../../assets/users.png';
import listecommande from '../../assets/listecommande.png';
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
            <Link to={'/listeusers'} style={{textDecoration:"none"}}>
                <div className="sidebar-item">
                    <img src={users} alt="" width="35" />
                    <p>Liste de utilisateurs</p>
                </div>
            </Link>
            <Link to={'/listecommandes'} style={{textDecoration:"none"}}>
                <div className="sidebar-item">
                    <img src={listecommande} alt="" width="35" />
                    <p>Liste de commandes</p>
                </div>
            </Link>
        </div>
    )
}
export default Sidebar