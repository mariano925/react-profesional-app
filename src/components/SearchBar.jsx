import React, { useState } from "react";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      onSearch(query);   // 👈 dispara la función que recibís por props (App.jsx)
      setQuery("");      // limpia el input después de buscar
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <input
        type="text"
        placeholder="Ingresa una ciudad..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          padding: "0.5rem",
          borderRadius: "4px",
          border: "1px solid #ccc",
          marginRight: "0.5rem",
        }}
      />
      <button
        type="submit"
        style={{
          padding: "0.5rem 1rem",
          borderRadius: "4px",
          border: "none",
          backgroundColor: "#0077cc",
          color: "white",
          cursor: "pointer",
        }}
      >
        Buscar
      </button>
    </form>
  );
}

export default SearchBar;
