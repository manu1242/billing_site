import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  const goToStore = () => {
    navigate('/sales'); 
  };

  return (
    <div className="main-page">
      <h1>Welcome to the Home Page</h1>
      <button onClick={goToStore}>Go to Store</button>
    </div>
  );
};

export default HomePage;
