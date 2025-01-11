import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import ProductPage from "./pages/ProductPage";
import CategoriesPage from "./pages/CategoriesPage";
import PaymentPage from "./pages/PaymentPage";
import TransactionsPage from "./pages/TransactionsPage";
import HomePage from "./components/HomePage";
import SalesPage from "./pages/SalesPage";
import './index.css'

const App = () => {
  return (
   
    <Router>
     
      <Navbar />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sales" element={<SalesPage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/transactions" element={<TransactionsPage />} />
      </Routes>
    </Router>
    
  );
};

export default App;
