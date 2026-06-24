import "./Iframe.css";

export default function Iframe({
  titulo,
  url,
  height = "700px"
}) {
  return (
    <section className="iframe-section">

      <h2 className="iframe-title">
        {titulo}
      </h2>

      <div className="iframe-wrapper">

        <iframe
          src={url}
          title={titulo}
          loading="lazy"
          allowFullScreen
        />

      </div>

    </section>
  );
}