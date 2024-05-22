import React, { useState } from 'react';
import './PasserCaisse.css';

const PasserCaisse = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    cardName: '',
    cardNumber: '',
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
    try {
      const response = await fetch('http://localhost:5000/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Commande passée avec succès!');
        setFormData({
          name: '',
          email: '',
          address: '',
          city: '',
          postalCode: '',
          country: '',
          cardName: '',
          cardNumber: '',
          expMonth: '',
          expYear: '',
          cvv: '',
        });
      } else {
        alert('Échec de la commande.');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de la commande.');
    }
  };

  return (
    <div className="checkout-container">
      <h1>Passer à la Caisse</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nom Complet</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="address">Adresse de Livraison</label>
          <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="city">Ville</label>
          <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="postalCode">Code Postal</label>
          <input type="text" id="postalCode" name="postalCode" value={formData.postalCode} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="country">Pays</label>
          <input type="text" id="country" name="country" value={formData.country} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="cardName">Nom sur la Carte</label>
          <input type="text" id="cardName" name="cardName" value={formData.cardName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="cardNumber">Numéro de Carte</label>
          <input type="text" id="cardNumber" name="cardNumber" value={formData.cardNumber} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="expMonth">Mois d'Expiration</label>
          <input type="text" id="expMonth" name="expMonth" value={formData.expMonth} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="expYear">Année d'Expiration</label>
          <input type="text" id="expYear" name="expYear" value={formData.expYear} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="cvv">CVV</label>
          <input type="text" id="cvv" name="cvv" value={formData.cvv} onChange={handleChange} required />
        </div>
        <button type="submit">Valider le Paiement</button>
      </form>
    </div>
  );
};

export default PasserCaisse;
