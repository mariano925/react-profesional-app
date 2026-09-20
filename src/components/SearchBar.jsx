import React, { useState } from "react";
import "./SearchBar.css";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedQuery = query.trim();

    if (trimmedQuery !== "") {
      onSearch(trimmedQuery);
      setQuery("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="city-search">Ciudad</label>

      <input
        id="city-search"
        type="text"
        placeholder="Ingresa una ciudad..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button type="submit">Buscar</button>
    </form>
  );
}

export default SearchBar;

