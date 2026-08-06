// src/components/ErrorMessage.jsx
import React from "react";

function ErrorMessage({ message }) {
  return (
    <div style={{ color: "red", marginTop: "10px" }}>
      <p>⚠️ {message}</p>
    </div>
  );
}

export default ErrorMessage;
