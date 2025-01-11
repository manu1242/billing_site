import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import "./Navbar.css";

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    console.log("Hamburger clicked!"); // Debug log
    setIsNavOpen(!isNavOpen);
  };

  const closeNav = () => {
    setIsNavOpen(false);
  };

  return (
    <div className="container-nav">
      <div className="hamburger" onClick={toggleNav}>
        <GiHamburgerMenu size={24} />
      </div>
      <nav className={`navbar ${isNavOpen ? "open" : ""}`}>
        <ul>
          <li>
            <Link to="/" onClick={closeNav}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/sales" onClick={closeNav}>
              BuyItems
            </Link>
          </li>
          <li>
            <Link to="/products" onClick={closeNav}>
              Products
            </Link>
          </li>
          <li>
            <Link to="/categories" onClick={closeNav}>
              Categories
            </Link>
          </li>
          <li>
            <Link to="/payment" onClick={closeNav}>
              Payments
            </Link>
          </li>
          <li>
            <Link to="/transactions" onClick={closeNav}>
              Transactions
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
