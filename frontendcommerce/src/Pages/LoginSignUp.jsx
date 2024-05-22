import React, { useState } from "react";
import './CSS/LoginSignUp.css'

const LoginSignUp = () => {
    const [state,setstate]=useState("Se connecter");
    const [formData,setformData]= useState({
        username:"",
        password:"",
        email:""
    })

   
    const gestionnaireChangements=(e)=>{
        setformData({...formData,[e.target.name]:e.target.value})
    }

    const connecter = async () => {
        console.log("Fonction de connexion est exécutée", formData);
        let responseData;
        await fetch('http://localhost:4000/signin', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        }).then((resp) => resp.json()).then((data) => { responseData = data });
        if (responseData.success ) {
            localStorage.setItem('auth-token', responseData.token);
            localStorage.setItem('user-role', responseData.role); // Stocker le rôle de l'utilisateur
            // window.location.href = 'http://localhost:3000'; // Redirection vers la page utilisateur par défaut
     // Redirection en fonction du rôle de l'utilisateur
     if (responseData.role === 'admin') {
        window.location.href = 'http://localhost:5173';
    } else {
        window.location.href = 'http://localhost:3000/Boutique';
    }
            //redirectToAppropriatePage(responseData.role);
        } else {
            alert(responseData.errors);
        }
    }

    const inscrire = async () => {
        console.log("Fonction s'inscrire est exécutée", formData);
        let responseData;
        await fetch('http://localhost:4000/signup', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        }).then((resp) => resp.json()).then((data) => { responseData = data });
        if (responseData.success) {
            localStorage.setItem('auth-token', responseData.token);
            localStorage.setItem('user-role', responseData.role); // Stocker le rôle de l'utilisateur
            redirectToAppropriatePage(responseData.role);
        } else {
            alert(responseData.errors);
        }
    }

    const redirectToAppropriatePage = (role) => {
        if (role === "admin") {
            window.location.replace("http://localhost:4000/signup");
        } else {
            window.location.replace("http://localhost:5173/signup");
        }
    }

    return(
        <div className="loginsignup">
            <div className="loginsignup-container"> 
                <h1>{state}</h1>
                <div className="loginsignup-form">
                    {state==="S'inscrire"?<input name='username' value={formData.username} onChange={gestionnaireChangements} type="text" placeholder="Votre Nom"/>:<></>}
                    <input type="email" name='email' value={formData.email} onChange={gestionnaireChangements} placeholder="Votre Email"/>
                    <div><input type="password" name='password' value={formData.password} onChange={gestionnaireChangements} placeholder="Votre Mot de Passe"/>
                    
                    </div>
                </div>
                <button onClick={()=>{state==="Se connecter"?connecter():inscrire()}}>Continue</button>
                {state==="S'inscrire"?<p className="loginsignup-login">Vous avez déjà un compte ? <span onClick={()=>{setstate("Se connecter")}}>Connectez-vous ici</span></p>
                :<p className="loginsignup-login">Créer un compte ? <span onClick={()=>{setstate("S'inscrire")}}>Cliquez ici</span></p>}
                
                <div className="loginsignup-agree">
                    <input type="checkbox" name='' id=''/>
                    <p>En continuant, j'accepte les conditions d'utilisation et la politique de confidentialité.</p>
                </div>
            </div>
        </div>
    )
}
export default LoginSignUp