export default function ModeSelector({ value, onChange }) {
  return (
    <div style={{ marginBottom: "16px" }}>
      <label
        style={{
          display: "block",
          fontSize: "13px",
          fontWeight: "500",
          color: "#374151",
          marginBottom: "6px",
        }}
      >
        Analysis Mode
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          padding: "12px 14px",
          borderRadius: "10px",
          border: "1px solid #d1d5db",
          backgroundColor: "#ffffff",
          fontSize: "14px",
          color: "#111827",
          cursor: "pointer",
          transition: "all 0.2s ease",
        }}
        onFocus={(e) =>
          (e.target.style.boxShadow =
            "0 0 0 3px rgba(37, 99, 235, 0.25)")
        }
        onBlur={(e) => (e.target.style.boxShadow = "none")}
      >
        <option value="summary">Summary</option>
        <option value="detailed">Detailed Analysis</option>
        <option value="risks">Risk Analysis</option>
      </select>
    </div>
  );
}
