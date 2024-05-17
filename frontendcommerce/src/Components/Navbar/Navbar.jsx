import React, { useState } from "react";
import './Navbar.css'
import logo from '../Assets/logo.png'
import Panier from '../Assets/Panier.png'
import { Link } from "react-router-dom";
import { useContext } from "react";
import { BoutiqueContext } from "../../Contexte/BoutiqueContext";

const Navbar = () => {
    const[menu,setMenu] = useState("accueil");
    const {getArticleTotalPanier}= useContext(BoutiqueContext)
    return(
        <div className="navbar">
            <div className="nav-logo">
                <img src={logo} alt="logo" height="80"></img>
                <div className="nav-logo-name">
                <h2>WM</h2>
                <h3>Accessoires</h3>
                </div>

            </div>
            <ul className="nav-menu">
                
                <li onClick={()=>{setMenu("bijoux")}}><Link style={{textDecoration : 'none'}} to='/bijoux'>Bijoux</Link>{menu==="bijoux"?<hr/>:<Link></Link>}
                    <ul className="sub-menu">
                        <li onClick={()=>{setMenu("bracelet")}}><Link style={{textDecoration : 'none'}}to='/bracelet'>Bracelet</Link>{menu==="bracelet"?<hr/>:<Link></Link>}</li>
                        <li onClick={()=>{setMenu("collier")}}><ink style={{textDecoration : 'none'}}to='/collier'>Collier</ink>{menu==="collier"?<hr/>:<Link></Link>}</li>
                        <li onClick={()=>{setMenu("bague")}}><Link style={{textDecoration : 'none'}}to='/bague'>Bague</Link>{menu==="bague"?<hr/>:<Link></Link>}</li>
                        <li onClick={()=>{setMenu("boucle")}}><Link style={{textDecoration : 'none'}}to='/boucle'>Boucle</Link>{menu==="boucle"?<hr/>:<Link></Link>}</li>
                    </ul>
                </li> 
                <li onClick={()=>{setMenu("sac")}}><Link style={{textDecoration : 'none'}}to='/sac'>Sacs</Link>{menu==="sac"?<hr/>:<Link></Link>}</li>
                <li onClick={()=>{setMenu("montre")}}><Link style={{textDecoration : 'none'}}to='/montre'>Montres</Link>{menu==="montre"?<hr/>:<Link></Link>}</li>
                <li onClick={()=>{setMenu("cheveux")}}><Link style={{textDecoration : 'none'}}to='/cheveux'>Cheuveux</Link>{menu==="cheveux"?<hr/>:<Link></Link>}</li>
                <li onClick={()=>{setMenu("telephone")}}><Link style={{textDecoration : 'none'}}to='/telephone'>Télephones</Link>{menu==="telephone"?<hr/>:<Link></Link>}</li>
            </ul>
            <div className="nav-logo-panier">
                {localStorage.getItem('auth-token')
                ?<button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Déconnecter</button>
                :<Link to='/login'><button>Connecter</button></Link>}
                
                <Link to='/panier'><img src={Panier} alt="Panier" height="60"></img></Link>
                <div className="nav-panier-count">{getArticleTotalPanier()}</div>
            </div>
        </div>
    )
}
export default Navbar