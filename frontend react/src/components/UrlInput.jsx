export default function UrlInput({ value, onChange }) {
  return (
    <input
      style={{
        width: "100%",
        padding: "12px",
        borderRadius: "8px",
        border: "1px solid #ddd",
        fontSize: "16px",
        marginBottom: "16px"
      }}
      type="text"
      placeholder="Enter company or article URL"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
