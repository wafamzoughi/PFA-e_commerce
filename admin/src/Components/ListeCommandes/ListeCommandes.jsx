import React, { useEffect, useState } from "react";
import './ListeCommandes.css';
import supp_icon from '../../assets/supp_icon.png'

const ListeCommandes = () => {
    const [touslesCommandes, settouslesCommandes] = useState([]);

    const recupererInfo = async () => {
        await fetch('http://localhost:4000/touslescommandes')
            .then((resp) => resp.json())
            .then((data) => {
                const reversedData = data.reverse(); // Inverser l'ordre des commandes
                settouslesCommandes(reversedData);
            });
    };

    useEffect(() => {
        recupererInfo();
    }, []);

    const supp_commande = async (id) => {
        await fetch('http://localhost:4000/supprimercommande', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: id })
        });
        await recupererInfo();
    };

    return (
        <div className="liste-commandes">
            <h1>Liste des Commandes</h1>
            <div className="listecommande-format-main">
                <p>Nom</p>
                <p>Prénom</p>
                <p>Adresse</p>
                <p>Télephone</p>
                <p>Produit</p>
                <p>Quantitè</p>
                <p>Price</p>
                <p>Supprimer</p>
            </div>
            <div className="listecommande-touslesCommandes">
                <hr />
                {touslesCommandes.map((commande, index) => {
                    return (
                        <div key={index}>
                            <div className="listecommande-format-main listecommande-format">
                                <p>{commande.nom}</p>
                                <p>{commande.prenom}</p>
                                <p>{commande.address}</p>
                                <p>{commande.tel}</p>
                                <ul className="listecommande-touslesCommandes">
                                    {commande.products.map((product, index) => (
                                        <li key={index}>
                                            <p style={{ marginRight: "-5px" }}>*{product.name}</p>
                                        </li>
                                    ))}
                                </ul>
                                <ul>
                                    {commande.products.map((product, index) => (
                                        <li key={index}>
                                            <p style={{ marginLeft: "25px" }}>{product.quantity}</p>
                                        </li>
                                    ))}
                                </ul>
                                <ul>
                                    {commande.products.map((product, index) => (
                                        <li key={index}>
                                            <p>{product.price}Dt</p>
                                        </li>
                                    ))}
                                </ul>
                                <img onClick={() => { supp_commande(commande.id) }} src={supp_icon} alt="" className="listecommande-supp-icon" />
                            </div>
                            <hr />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ListeCommandes;
