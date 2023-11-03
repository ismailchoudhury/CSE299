// SearchResults.js
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
// import "./searchResults.css";
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
      {Array.isArray(searchResults) && searchResults.length > 0 ? (
        <ul>
          {searchResults.map((result, index) => (
            <li key={index} className="search-result-item">
              <h3 className="product-name">{result.name}</h3>
              <img
                className="product-image"
                src={result.imgURL}
                alt={result.name}
              />
              <p className="product-description">
                Description: {result.description}
              </p>
              <p className="product-price">Price: ${result.price}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-results-message">No results found.</p>
      )}
    </div>
  );
}

export default SearchResults;
