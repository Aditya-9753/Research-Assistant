export default function ResultCard({ data }) {
  return (
    <div
      style={{
        marginTop: "30px",
        padding: "20px",
        background: "#f9fafb",
        borderRadius: "10px",
        border: "1px solid #e5e7eb"
      }}
    >
      <h3 style={{ marginTop: 0 }}>Analysis Result</h3>

      <p style={{ lineHeight: "1.6" }}>{data.answer}</p>

      <div style={{ marginTop: "16px" }}>
        <h4>Sources</h4>
        <ul>
          {data.sources.map((src, i) => (
            <li key={i}>
              <a
                href={src}
                target="_blank"
                rel="noreferrer"
                style={{ color: "#2563eb" }}
              >
                {src}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
