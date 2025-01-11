import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SalesPage.css";

const HomePage = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState({});
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(""); 
  const [products, setProducts] = useState([]);
  const [transactionSaved, setTransactionSaved] = useState(false);

  const navigate = useNavigate();

  
  useEffect(() => {
    const storedCategories = JSON.parse(localStorage.getItem("categories")) || {};
    setCategories(storedCategories);
  }, []);

  const handleAddProduct = () => {
    if (selectedProduct && quantity > 0) {
      const productPrice = categories[category]?.products[selectedProduct] || 0;
      const newProduct = {
        name: selectedProduct,
        price: productPrice,
        quantity,
        total: productPrice * quantity,
      };
      setProducts([...products, newProduct]);
      setSelectedProduct("");
      setQuantity("");
    }
  };

  const handleSaveTransaction = () => {
    if (name && category && products.length > 0) {
      const transaction = {
        name,
        category,
        products,
        date: new Date().toISOString(),
      };
      const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
      transactions.push(transaction);
      localStorage.setItem("transactions", JSON.stringify(transactions));
      setName("");
      setCategory("");
      setProducts([]);
      setTransactionSaved(true);
    }
  };

  const handleClearTransaction = () => {
    setTransactionSaved(false);
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^[0-9]+$/.test(value)) {
      setQuantity(value);
    }
  };

  return (
    <div className="container">
      <h1>Buying Page</h1>
      <div className="form-container">
        <label>Name:</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />

        <label>Category:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select Category</option>
          {Object.keys(categories).map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <label>Product:</label>
        <select
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
          disabled={!category}
        >
          <option value="">Select Product</option>
          {categories[category]?.products &&
            Object.keys(categories[category].products).map((prod) => (
              <option key={prod} value={prod}>
                {prod}
              </option>
            ))}
        </select>

        <label>Quantity:</label>
        <input
          type="number"
          value={quantity}
          min="1"
          onChange={handleQuantityChange}
          disabled={!selectedProduct}
        />
      </div>

      <div className="button-container">
        <button onClick={handleAddProduct} disabled={!quantity || !selectedProduct}>
          Add Product
        </button>
        <button onClick={handleSaveTransaction} disabled={!products.length}>
          Save Transaction
        </button>
      </div>

      {products.length > 0 && !transactionSaved && (
        <div className="products-list">
          <h2>Added Products</h2>
          {products.map((product, index) => (
            <div key={index} className="product-item">
              <p>
                <strong>Product Name:</strong> {product.name}
              </p>
              <p>
                <strong>Quantity:</strong> {product.quantity}
              </p>
              <p>
                <strong>Total Price:</strong> ₹{product.total}
              </p>
            </div>
          ))}
        </div>
      )}

      {transactionSaved && (
        <div className="transaction-saved">
          <h2>Transaction Saved!</h2>
          <button onClick={handleClearTransaction}>Clear Transaction</button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
