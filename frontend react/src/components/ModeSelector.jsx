export default function ModeSelector({ value, onChange }) {
  return (
    <select
      style={{
        width: "100%",
        padding: "12px",
        borderRadius: "8px",
        border: "1px solid #ddd",
        fontSize: "16px",
        marginBottom: "16px",
        background: "#fff"
      }}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="summary">Summary</option>
      <option value="detailed">Detailed Analysis</option>
      <option value="risks">Risk Analysis</option>
    </select>
  );
}
