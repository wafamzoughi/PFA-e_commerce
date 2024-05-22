import React, { useEffect, useState } from "react";
import './ListeUsers.css';
const ListeUsers = () => {
    const [touslesusers, settouslesusers]=useState([]);
    const recupererInfo=async()=>{
        await fetch('http://localhost:4000/touslesusers')
        .then((resp)=>resp.json())
        .then((data)=>{settouslesusers(data) })
    }
    useEffect(()=>{
        recupererInfo();
    },[])

    return(
        <div className="liste-users">
            <h1>Liste des utilisateurs</h1>
            <div className="listeusers-format-main">
                <p>Nom</p>
                <p>Email</p>
                <p>Mot de passe</p>
            </div>
            <div className="listeusers-touslesusers">
                <hr/>
                {touslesusers.map((utilisateur,index)=>{
                    return <><div key={index} className="listeusers-format-main listeusers-format">
                       
                        <p>{utilisateur.name}</p>
                        <p>{utilisateur.email}</p>
                        <p>{utilisateur.password}</p>
                    </div>
                    <hr/>
                    </>
                })}
            </div>
        </div>
    )
}
export default ListeUsers