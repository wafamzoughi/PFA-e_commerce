import React from "react";
import'./Admin.css';
import Sidebar from '../../Components/Sidebar/Sidebar';
import{Routes,Route} from 'react-router-dom';

import AjouterProduit from "../../Components/AjouterProduit/AjouterProduit";
import ListeProduit from "../../Components/ListeProduit/ListeProduit";
import ListeUsers from "../../Components/ListeUsers/ListeUsers";
import ListeCommandes from "../../Components/ListeCommandes/ListeCommandes";
const Admin = () => {
    return(
        <div className="admin">
            <Sidebar/>
            <Routes>
                <Route path="/ajouterproduit" element={<AjouterProduit/>}/>
                <Route path="/listeproduit" element={<ListeProduit/>}/>
                <Route path="/listeusers" element={<ListeUsers/>}/>
                <Route path="/listecommandes" element={<ListeCommandes/>}/>
                
            </Routes>
        </div>
    )
}
export default Admin