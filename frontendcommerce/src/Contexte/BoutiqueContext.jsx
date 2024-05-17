import React, { createContext, useEffect, useState } from "react"; 


export const BoutiqueContext = createContext(null);
const ObtenirPanierParDéfaut =()=>{
    let panier={};
    for (let index=0; index < 300+1; index++){
        panier[index]=0;
    }
    return panier;
}
const BoutiqueContextProvider = (props) => {
    const [all_product,setall_product]=useState([]);
    const [articlesPanier,setArticlesPanier]=useState(ObtenirPanierParDéfaut);
    useEffect(()=>{
        fetch('http://localhost:4000/touslesproduits')
        .then((resp)=>resp.json())
        .then((data)=>setall_product(data))
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/getpanier',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:"",
            }).then((resp)=>resp.json())
            .then((data)=>setArticlesPanier(data));
        }
    },[])

    const ajouterAuPanier=(articleId)=>{
    setArticlesPanier((précédent)=>({...précédent,[articleId]:précédent[articleId]+1}));
    if(localStorage.getItem('auth-token')){
        fetch('http://localhost:4000/ajouteraupanier',{
            method:'POST',
            headers:{
                Accept:'application/form-data',
                'auth-token':`${localStorage.getItem('auth-token')}`,
                'Content-Type':'application/json',
            },
            body:JSON.stringify({"articleId":articleId}),
        })
        .then((resp)=>resp.json())
        .then((data)=>console.log(data));
    }
}
const supprimerDuPanier=(articleId)=>{
    setArticlesPanier((précédent)=>({...précédent,[articleId]:précédent[articleId]-1}));
    if(localStorage.getItem('auth-token')){
        fetch('http://localhost:4000/supprimerdupanier',{
            method:'POST',
            headers:{
                Accept:'application/form-data',
                'auth-token':`${localStorage.getItem('auth-token')}`,
                'Content-Type':'application/json',
            },
            body:JSON.stringify({"articleId":articleId}),
        })
        .then((resp)=>resp.json())
        .then((data)=>console.log(data));
    }
}
const getMontantTotalPanier=()=>{
    let montanttotal=0;
    for(const article in articlesPanier){
        if(articlesPanier[article]>0)
        {
            let articleInfo = all_product.find((produit)=>produit.id===Number(article))
            montanttotal += articleInfo.new_price * articlesPanier[article];   
        }
    }
    return montanttotal ;
}
const getArticleTotalPanier=()=>{
    let articletotal=0;
    for(const article in articlesPanier){
        if(articlesPanier[article]>0)
        {
            articletotal +=  articlesPanier[article];
               
        }
    }
    return articletotal ;
}
const contextValue = {getMontantTotalPanier,getArticleTotalPanier,all_product,articlesPanier,ajouterAuPanier,supprimerDuPanier};
return (
    <BoutiqueContext.Provider value={contextValue}>
        {props.children}
    </BoutiqueContext.Provider>

)
}

export default BoutiqueContextProvider;