// src/components/SearchBar.jsx
import React from "react";
import { useState } from "react";
import { WeatherContext } from "../context/WeatherContext";

function SearchBar({ onSearch }) {
  const {setCity} = React.useContext(WeatherContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCity(e.target.elements.city.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="city" placeholder="Buscar ciudad..." />
       
      <button type="submit">Buscar</button>
    </form>
  );
}

export default SearchBar;
