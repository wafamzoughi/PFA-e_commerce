import React, { useState } from "react";
import './AjouterProduit.css'
import zone_de_telechargement from '../../assets/zone_telechargement.svg';
const AjouterProduit = () => {
    const[image,setImage]=useState(null);
    const [detailsProduit,setdetailsProduit]=useState({
        name:"",
        image:"",
        category:"colliers",
        new_price:"",
        old_price:""

    })
    const gestionnaireImages=(e)=>{
        setImage(e.target.files[0]);
    }
    const gestionnaireChangements=(e)=>{
        setdetailsProduit({...detailsProduit,[e.target.name]:e.target.value})
    }
    const ajouter_produit = async ()=>{
        console.log(detailsProduit);
        //ajouter produits dans backend
        let reponseData;
        let produit = detailsProduit;

        let formData = new FormData();
        formData.append('produit',image);

        await fetch ('http://localhost:4000/upload', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
            },
            body: formData,
        })
        .then((resp) => resp.json()).then((data)=>{reponseData = data})
        
        if(reponseData.success)
        {
            produit.image= reponseData.image_url;
            console.log(produit);
            await fetch ('http://localhost:4000/ajouterproduit', {
            method:'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify(produit),
        }).then((resp)=>resp.json()).then((data)=>{
            data.success?alert("Produit Ajoutée"):alert("Echoué")
        })
        }
    }
    return(
        <div className="ajouter-produit">
            <div className="ajouterproduit-champarticle">
                <p>Titre de Produit</p>
                <input value={detailsProduit.name} onChange={gestionnaireChangements} type="text" name="name" placeholder="Ecrire ici.."/>
            </div>
            <div className="ajouterproduit-prix">
                <div className="ajouterproduit-champarticle">
                    <p>Prix</p>
                    <input value={detailsProduit.old_price} onChange={gestionnaireChangements} type="text" name="old_price" placeholder="Ecrire ici.."/>
                </div>
                <div className="ajouterproduit-champarticle">
                    <p>Prix de l'offre</p>
                    <input value={detailsProduit.new_price} onChange={gestionnaireChangements} type="text" name="new_price" placeholder="Ecrire ici.."/>
                </div>
            </div>
            <div className="ajouterproduit-champarticle">
                <p>Catégorie de produit</p>
                <select value={detailsProduit.category} onChange={gestionnaireChangements} name="category" className="ajouter-produit-selecteur">
                    <option value="colliers">Collier</option>
                    <option value="bracelets">Bracelet</option>
                    <option value="bagues">Bague</option>
                    <option value="boucles">Boucles</option>
                    <option value="sacs">Sac</option>
                    <option value="cheveux">Cheveux</option>
                    <option value="montres">Montre</option>
                    <option value="telephones">Téléphone</option>
                </select>

                    
            </div>
            <div className="ajouterproduit-champarticle">
                <label htmlFor="fichier-input">
                    <img src={image?URL.createObjectURL(image):zone_de_telechargement} className="ajouterproduit-telecharger-img" alt=""/>
                </label>
                <input onChange={gestionnaireImages} type="file" name="image" id="fichier-input" hidden/>
            </div>
            <button onClick={()=>{ajouter_produit()}} className="ajouterproduit-btn">Ajouter</button>
        </div>
    )
}
export default AjouterProduit