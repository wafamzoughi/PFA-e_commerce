import React, { useEffect, useState } from "react";
import './ProduitSimilaire.css';
import Produit from '../Article/Article';

const ProduitSimilaire = () => {
    const [produitsSimilaires, setProduitsSimilaires] = useState([]);

    useEffect(() => {
        const fetchProduitsSimilaires = async () => {
            try {
                const response = await fetch(`http://localhost:4000/produits-similaires`);
                const data = await response.json();
                setProduitsSimilaires(data);
            } catch (error) {
                console.error("Erreur lors de la récupération des produits similaires :", error);
            }
        };
        fetchProduitsSimilaires();
    }, []);

    return (
        <div className="produitsimilaire">
            <h1>Vous pourriez aussi aimer</h1>
            <hr />
            <div className="produitsimilaire-produit">
                {Array.isArray(produitsSimilaires) && produitsSimilaires.length > 0 ? (
                    produitsSimilaires.map((produit, i) => {
                        return <Produit key={i} id={produit.id} nom={produit.name} image={produit.image} nouveau_prix={produit.new_price} ancien_prix={produit.old_price} />;
                    })
                ) : (
                    <p>Aucun produit similaire trouvé.</p>
                )}
            </div>
        </div>
    );
};

export default ProduitSimilaire;
