// SearchResults.js
import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import "./searchResults.css";

function SearchResults() {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("keyword");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Fetch search results based on the searchQuery
    if (searchQuery) {
      fetch(`/api/products/search?keyword=${searchQuery}`)
        .then(response => response.json())
        .then(data => {
          setSearchResults(data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [searchQuery]);

  return (
    <div className="search-results-container">
      <h2>Search Results for "{searchQuery}"</h2>
      <ul className="product-list">
        {searchResults.map((result, index) => (
          <li key={result._id} className="product-item">
            {result.imgURL && (
              <img
                className="product-image"
                src={result.imgURL}
                alt={result.name}
              />
            )}
            <div className="product-details">
              <h3 className="product-name smaller-name">
                <Link to={`/product/${result._id}`}>{result.name}</Link>
              </h3>
              <p className="product-price">Price: ${result.price}</p>
            </div>
          </li>
        ))}
      </ul>
      {searchResults.length === 0 && (
        <p className="no-results-message">No results found.</p>
      )}
    </div>
  );
}

export default SearchResults;
