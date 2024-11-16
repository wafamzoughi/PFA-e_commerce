import React, { useState, useContext } from 'react';
import './PasserCaisse.css';
import { BoutiqueContext } from '../../Contexte/BoutiqueContext';

const PasserCaisse = () => {
  const { getMontantTotalPanier, articlesPanier, all_product } = useContext(BoutiqueContext);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    tel: '',
    address: '',
    region: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };




  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get products from cart
    const products = all_product.filter(product => articlesPanier[product.id] > 0)
          .map(product => ({
          id: product.id,
          name: product.name,
          quantity: articlesPanier[product.id],
          price: product.new_price,
    }));

    const total = getMontantTotalPanier() + 8; // Including delivery fee

    try {
      const response = await fetch('http://localhost:4000/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, products, total }),
      });

      if (response.ok) {
        alert('Commande passée avec succès!');
        setFormData({
          nom: '',
          prenom: '',
          email: '',
          tel: '',
          address: '',
          region: '',
        });
      } else {
        const errorData = await response.json();
        console.error('Server Error:', errorData);
        alert('Échec de la commande.');
      }
    } catch (error) {
      console.error('Fetch Error:', error);
      alert('Erreur lors de la commande.');
    }
  };

  return (
    <div className="checkout-container">
      <h1>Adresse Client</h1>
      <div className="checkout-content">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nom">Nom </label>
            <input type="text" id="nom" name="nom" value={formData.nom} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="prenom">Prénom</label>
            <input type="text" id="prenom" name="prenom" value={formData.prenom} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="tel">Télephone</label>
            <input type="number" id="tel" name="tel" value={formData.tel} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="address">Adresse de Livraison</label>
            <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="region">Région</label>
            <select required className="sel" id="fi-regionId" name="region" value={formData.region} onChange={handleChange}>
              <option disabled value="">Sélectionner</option>
              <option>Bizerte</option>
              <option>Kairouan</option>
              <option>Mahdia</option>
              <option>Monastir</option>
              <option>Nabeul</option>
              <option>Sfax</option>
              <option>Sousse</option>
              <option>Tunis</option>
            </select>
          </div>
          <button type="submit">Valider le Paiement</button>
        </form>

        <div className="articlesPanier-total">
          <h1>Totaux du Panier</h1>
          <div>
            <div className="articlesPanier-total-article">
              <p>Sous-total</p>
              <p>{getMontantTotalPanier()}DT</p>
            </div>
            <hr />
            <div className="articlesPanier-total-article">
              <p>Frais de Livraison</p>
              <p>8DT</p>
            </div>
            <hr />
            <div className="articlesPanier-total-article">
              <h3>Total</h3>
              <h3>{getMontantTotalPanier() + 8}DT</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasserCaisse;