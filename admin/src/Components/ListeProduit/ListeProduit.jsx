import React, { useEffect, useState } from "react";
import './ListeProduit.css';
import supp_icon from '../../assets/supp_icon.png'
const ListeProduit = () => {
    const [touslesproduits, settouslesproduits]=useState([]);
    const recupererInfo=async()=>{
        await fetch('http://localhost:4000/touslesproduits')
        .then((resp)=>resp.json())
        .then((data)=>{settouslesproduits(data) })
    }
    useEffect(()=>{
        recupererInfo();
    },[])

    const supp_produit=async(id)=>{
        await fetch('http://localhost:4000/supprimerproduit', {
            method:'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify({id:id})
        })
        await recupererInfo();
        
    }
    return(
        <div className="liste-produit">
            <h1>Liste des Produits</h1>
            <div className="listeproduit-format-main">
                <p>Produits</p>
                <p>Titre</p>
                <p>Ancien Prix</p>
                <p>Nouveau Prix</p>
                <p>Catégorie</p>
                <p>Supprimer</p>
            </div>
            <div className="listeproduit-touslesproduits">
                <hr/>
                {touslesproduits.map((produit,index)=>{
                    return <><div key={index} className="listeproduit-format-main listeproduit-format">
                        <img src={produit.image} alt="" className="listeproduit-produit-icon" />
                        <p>{produit.name}</p>
                        <p>{produit.old_price}DT</p>
                        <p>{produit.new_price}DT</p>
                        <p>{produit.category}</p>
                        <img onClick={()=>{supp_produit(produit.id)}} src={supp_icon} alt="" className="listeproduit-supp-icon"/>
                    </div>
                    <hr/>
                    </>
                })}
            </div>
        </div>
    )
}
export default ListeProduit