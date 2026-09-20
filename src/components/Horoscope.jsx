import { useEffect, useState } from "react";
import zodiacSigns from "../data/zodiacSigns";
import { getDailyHoroscope } from "../services/sigastra";
import "./Horoscope.css";

function Horoscope() {
  const [sign, setSign] = useState("aries");
  const [horoscope, setHoroscope] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const selectedSign = zodiacSigns.find(
    (zodiacSign) => zodiacSign.value === sign
  );

  useEffect(() => {
    async function fetchHoroscope() {
      try {
        setLoading(true);
        setError("");

        const data = await getDailyHoroscope(sign);

        setHoroscope(data);
      } catch (error) {
        setError(error.message);
        setHoroscope(null);
      } finally {
        setLoading(false);
      }
    }

    fetchHoroscope();
  }, [sign]);

  const item = horoscope?.items?.[0];
  const data = item?.data;
  const editorial = item?.editorial;

  const publishedDate = horoscope?.date
    ? new Date(`${horoscope.date}T00:00:00`).toLocaleDateString("es-AR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  const editorialSections = editorial?.body?.filter(
    (section) => section.heading && section.text
  );

  return (
    <section className="horoscope" aria-labelledby="horoscope-title">
      <div className="horoscope-header">
        <div className="horoscope-title">
          <span className="horoscope-icon" aria-hidden="true">
            ✨
          </span>

          <div>
            <h2 id="horoscope-title">Horóscopo diario</h2>

            <p className="horoscope-sign">
              {selectedSign?.name || item?.sign}
            </p>
          </div>
        </div>

        <div className="horoscope-selector">
          <label htmlFor="horoscope-sign">Signo zodiacal</label>

          <select
            id="horoscope-sign"
            value={sign}
            onChange={(event) => setSign(event.target.value)}
          >
            {zodiacSigns.map((zodiacSign) => (
              <option key={zodiacSign.value} value={zodiacSign.value}>
                {zodiacSign.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading && (
        <p className="horoscope-loading" role="status" aria-live="polite">
          Cargando horóscopo...
        </p>
      )}

      {error && (
        <p className="horoscope-error" role="alert">
          {error}
        </p>
      )}

      {item && !loading && (
        <div className="horoscope-content">
          {item.media?.url && (
            <figure className="horoscope-image-wrapper">
              <img
                className="horoscope-image"
                src={item.media.url}
                alt={item.media.alt || `${item.sign} — Horóscopo diario`}
                loading="lazy"
              />

              {item.media.credit && (
                <figcaption className="horoscope-image-credit">
                  Imagen: {item.media.credit}
                </figcaption>
              )}
            </figure>
          )}

          <div className="horoscope-intro">
            <h3>{item.title || editorial?.headline}</h3>

            {publishedDate && (
              <p className="horoscope-date">
                Horóscopo del {publishedDate}
              </p>
            )}
          </div>

          {data && (
            <div
              className="horoscope-summary"
              aria-label="Resumen del día"
            >
              <div className="horoscope-rating">
                <span>Amor</span>

                <strong>{data.love} de 5</strong>
              </div>

              <div className="horoscope-rating">
                <span>Trabajo</span>

                <strong>{data.work} de 5</strong>
              </div>

              <div className="horoscope-rating">
                <span>Energía</span>

                <strong>{data.energy} de 5</strong>
              </div>
            </div>
          )}

          <article className="horoscope-text">
            <h3>Tu horóscopo</h3>

            {item.text
              ?.split(/\n+/)
              .filter((paragraph) => paragraph.trim())
              .map((paragraph, index) => (
                <p key={index}>{paragraph.trim()}</p>
              ))}
          </article>

          {editorialSections?.length > 0 && (
            <div className="horoscope-highlights">
              {editorialSections.map((section) => (
                <article
                  className="horoscope-highlight"
                  key={section.heading}
                >
                  <h3>{section.heading}</h3>

                  <p>{section.text}</p>
                </article>
              ))}
            </div>
          )}

          {horoscope.attribution?.localizedHref && (
            <a
              className="horoscope-attribution"
              href={horoscope.attribution.localizedHref}
              target="_blank"
              rel="dofollow"
            >
              Powered by Sigastra ↗
            </a>
          )}
        </div>
      )}
    </section>
  );
}

export default Horoscope;