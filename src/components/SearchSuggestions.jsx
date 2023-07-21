import React from "react";
import "../css/SearchSuggestions.css"; // Import the CSS file for styling

const SearchSuggestions = ({ suggestions }) => {
  return (
    <ul className="header__searchResults">
      {suggestions.map((suggestion) => {
        return (
          <li>
            {suggestion.title}
            <img
              className="searchedImage"
              src={suggestion.image}
              alt="search"
            />
            <div>Price: {suggestion.price}</div>
          </li>
        );
      })}
    </ul>
  );
};

export default SearchSuggestions;
