import React, { useState, useEffect } from "react";
import "./ProductPage.css";

const ProductPage = () => {
  const [categories, setCategories] = useState(
    JSON.parse(localStorage.getItem("categories")) || {}
  );
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newProduct, setNewProduct] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    const storedCategories = JSON.parse(localStorage.getItem("categories")) || {};
    setCategories(storedCategories);
  }, []);

  const handleAddProduct = () => {
    if (selectedCategory && newProduct && price > 0) {
      const updatedCategories = {
        ...categories,
        [selectedCategory]: {
          ...categories[selectedCategory],
          products: {
            ...categories[selectedCategory].products,
            [newProduct]: parseFloat(price),
          },
        },
      };
      setCategories(updatedCategories);
      localStorage.setItem("categories", JSON.stringify(updatedCategories));
      setNewProduct("");
      setPrice("");
    }
  };

  const handleDeleteProduct = (product) => {
    if (selectedCategory) {
      const updatedProducts = { ...categories[selectedCategory].products };
      delete updatedProducts[product];

      const updatedCategories = {
        ...categories,
        [selectedCategory]: {
          ...categories[selectedCategory],
          products: updatedProducts,
        },
      };

      setCategories(updatedCategories);
      localStorage.setItem("categories", JSON.stringify(updatedCategories));
    }
  };

  return (
    <div className="product-page">
      <h1>Manage Products</h1>
      <div className="form-container">
        <label>Select Category:</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          {Object.keys(categories).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        {selectedCategory && (
          <>
            <label>Add Product:</label>
            <input
              value={newProduct}
              onChange={(e) => setNewProduct(e.target.value)}
              placeholder="Enter product name"
            />
            <label>Price:</label>
            <input
              type="number"
              value={price}
              min="0"
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter product price"
            />
            <button onClick={handleAddProduct}>Add Product</button>
          </>
        )}
      </div>

      {selectedCategory && (
        <div className="products-list">
          <h3>Products in {selectedCategory}:</h3>
          <ul>
            {Object.keys(categories[selectedCategory]?.products || {}).map(
              (product) => (
                <li key={product}>
                  {product} - ₹{categories[selectedCategory].products[product]}
                  <button onClick={() => handleDeleteProduct(product)}>
                    Delete
                  </button>
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
