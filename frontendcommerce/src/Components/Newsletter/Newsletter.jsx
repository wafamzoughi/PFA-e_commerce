import React from "react";
import'./Newsletter.css'
const Newsletter = () => {
    return(
        <div className="newsletter">
            <h1>Recevez des offres exclusives sur votre email</h1>
            <p>Abonnez-vous à notre newsletter et restez informé</p>
            <div>
                <input type="email" placeholder="Votre Email..."/>
                <button>S'abonner</button>
            </div>
        </div>
    )
}
export default Newsletter