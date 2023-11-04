import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./CategoryDropdown.css";

const CategoryDropdown = () => {
  const [categories, setCategories] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    // Fetch categories from the API endpoint
    fetch("/api/products/categories/")
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error("Failed to fetch categories:", error));
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="category-dropdown">
      <button
        className="dropbtn"
        onMouseEnter={toggleDropdown}
        onMouseLeave={toggleDropdown}
      >
        Shop by Category
      </button>
      <div
        className={`dropdown-content ${isDropdownOpen ? "show" : ""}`}
        onMouseEnter={() => setIsDropdownOpen(true)}
        onMouseLeave={() => setIsDropdownOpen(false)}
      >
        {categories.map(category => (
          <Link
            key={category}
            to={`/categoryPage/${category}`} // Use the Link component to navigate
          >
            {category}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryDropdown;
