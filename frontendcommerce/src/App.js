
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter,Routes,Route} from 'react-router-dom';
import Panier from './Pages/Panier';
import LoginSignUp from './Pages/LoginSignUp';
import Produit from './Pages/Produit.jsx';
import BoutiqueCatégorie from './Pages/BoutiqueCatégorie.jsx';
import Boutique from './Pages/Boutique.jsx';
import Footer from './Components/Footer/Footer.jsx';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Boutique />}/>
        <Route path='/bijoux' 
        element={
          <>
            <BoutiqueCatégorie  category="colliers" />
            <BoutiqueCatégorie category="bracelets" />
            <BoutiqueCatégorie category="bagues" />
            <BoutiqueCatégorie category="boucles" />
            
          </>
        }
        />
        <Route path='/bracelet' element={<BoutiqueCatégorie  category="bracelets"/>}/>
        <Route path='/collier' element={<BoutiqueCatégorie  category="colliers"/>}/>
        <Route path='/bague' element={<BoutiqueCatégorie category="bagues"/>}/>
        <Route path='/boucle' element={<BoutiqueCatégorie category="boucles"/>}/>
        <Route path='/sac' element={<BoutiqueCatégorie category="sacs"/>}/>
        <Route path='/cheveux' element={<BoutiqueCatégorie category="cheveux"/>}/>
        <Route path='/montre' element={<BoutiqueCatégorie category="montres"/>}/>
        <Route path='/telephone' element={<BoutiqueCatégorie category="telephones"/>}/>
        <Route path="/produit" element={<Produit/>}>
          <Route path=':produitId' element={<Produit/>}/>
        </Route>
        <Route path='/panier' element={<Panier/>}/>
        <Route path='/login' element={<LoginSignUp/>} />
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
