// src/components/SearchBar.jsx
import React, { useState, useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";

function SearchBar({ onSearch }) {
  const {setCity} = useContext(WeatherContext);
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if(query.trim() !== "") {
      setCity(query);
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="city"
        placeholder="Buscar ciudad..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
       
      <button type="submit">Buscar</button>
    </form>
  );
}

export default SearchBar;
