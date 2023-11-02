import React from "react";
import { useLocation } from "react-router-dom";

const SearchResults = () => {
  const location = useLocation();
  const { searchResults } = location.state;

  return (
    <div>
      <h1>Search Results</h1>
      <ul>
        <li>{searchResults.name}</li>
      </ul>
    </div>
  );
};

export default SearchResults;
