import React from "react";
import'./Admin.css';
import Sidebar from '../../Components/Sidebar/Sidebar';
import{Routes,Route} from 'react-router-dom';

import AjouterProduit from "../../Components/AjouterProduit/AjouterProduit";
import ListeProduit from "../../Components/ListeProduit/ListeProduit";
import ListeUsers from "../../Components/ListeUsers/ListeUsers";
const Admin = () => {
    return(
        <div className="admin">
            <Sidebar/>
            <Routes>
                <Route path="/ajouterproduit" element={<AjouterProduit/>}/>
                <Route path="/listeproduit" element={<ListeProduit/>}/>
                <Route path="/listeusers" element={<ListeUsers/>}/>
                
            </Routes>
        </div>
    )
}
export default Admin