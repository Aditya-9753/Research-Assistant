export default function ResultCard({ data }) {
  if (!data) return null;

  return (
    <div
      style={{
        marginTop: "32px",
        padding: "24px",
        background: "#ffffff",
        borderRadius: "12px",
        border: "1px solid #e5e7eb",
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
      }}
    >
      {/* Title */}
      <h3
        style={{
          marginTop: 0,
          marginBottom: "12px",
          fontSize: "18px",
          fontWeight: "600",
          color: "#111827",
        }}
      >
        Analysis Result
      </h3>

      {/* Result Text */}
      <p
        style={{
          lineHeight: "1.7",
          fontSize: "14px",
          color: "#1f2937",
          whiteSpace: "pre-wrap",   // 👈 multiline support
          wordBreak: "break-word",  // 👈 long text fix
        }}
      >
        {data.answer}
      </p>

      {/* Sources */}
      {data.sources && data.sources.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h4
            style={{
              marginBottom: "8px",
              fontSize: "14px",
              fontWeight: "600",
              color: "#111827",
            }}
          >
            Sources
          </h4>

          <ul style={{ paddingLeft: "18px", margin: 0 }}>
            {data.sources.map((src, i) => (
              <li key={i} style={{ marginBottom: "6px" }}>
                <a
                  href={src}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    color: "#2563eb",
                    fontSize: "13px",
                    textDecoration: "underline",
                    wordBreak: "break-all",
                  }}
                >
                  {src}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
