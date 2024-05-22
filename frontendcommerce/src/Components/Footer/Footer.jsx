import React from "react";
import'./Footer.css'
import footer_logo from '../Assets/logo.png'
import facebook_icon from'../Assets/facebook_icon.png'
import instagram_icon from'../Assets/instagram_icon.png'
import whatsapp_icon from'../Assets/whatsapp_icon.png'
const Footer = () => {
    return(
        
        <div className="footer">
            
            <div className="footer-logo">
                <img src={footer_logo} alt=""/>
                <h2>WM</h2>
                <h3>Accessoires</h3>
                <ul className="footer-links">
                    <li>Entreprise</li>
                    <li>Produits</li>
                    <li>A propos</li>
                    
                </ul>
                <div className="footer-social-icon">
                    <div className="footer-icons-container">
                        <a href="https://www.facebook.com/profile.php?id=100093195588711">
                            <img src={facebook_icon} alt="facebook_icon"  width="70" height="70"/>
                        </a>
                    </div>
                    <div className="footer-icons-container">
                        <a href="https://www.instagram.com/by_foufaa/">
                        <img src={instagram_icon} alt="instagram_icon" />
                        </a>
                    </div>
                    <div className="footer-icons-container">
                        <img src={whatsapp_icon} alt="whatsapp_icon" />
                    </div>
                </div>
                <div className="footer-copyright">
                    <hr/>
                    <p>Copyright @ 2024 - All Right Reserved.</p>

                </div>
            </div>
        </div>
    )
}
export default Footer