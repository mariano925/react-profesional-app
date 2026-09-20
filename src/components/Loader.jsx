import "./Loader.css";

function Loader() {
  return (
    <div
      className="loader"
      role="status"
      aria-live="polite"
    >
      <div
        className="spinner"
        aria-hidden="true"
      ></div>

      <p>Cargando...</p>
    </div>
  );
}

export default Loader;