import React, { useState, useEffect } from "react";

const CategoriesPage = () => {
  const [categories, setCategories] = useState({});
  const [newCategory, setNewCategory] = useState("");
  const [showCategories, setShowCategories] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const storedCategories = JSON.parse(localStorage.getItem("categories"));
    if (storedCategories) {
      setCategories(storedCategories);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  const handleAddCategory = () => {
    if (newCategory && !categories[newCategory]) {
      const updatedCategories = { ...categories, [newCategory]: { products: {} } };
      setCategories(updatedCategories);
      setNewCategory("");
    }
  };

  const handleDeleteCategory = () => {
    if (selectedCategory) {
      const updatedCategories = { ...categories };
      delete updatedCategories[selectedCategory];
      setCategories(updatedCategories);
      setSelectedCategory("");
    }
  };

  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };

  return (
    <div className="categories-page">
      <h1>Manage Categories</h1>
      <div className="form-container">
        <label>Add New Category:</label>
        <input
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Enter category name"
        />
        <button onClick={handleAddCategory}>Add Category</button>
      </div>

      <div className="modify-button">
        <button onClick={toggleCategories}>{showCategories ? "Hide Categories" : "Modify Categories"}</button>
      </div>

      {showCategories && (
        <div>
          <div className="categories-dropdown">
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
          </div>

          {selectedCategory && (
            <div className="delete-category">
              <button onClick={handleDeleteCategory}>Delete Category</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;
