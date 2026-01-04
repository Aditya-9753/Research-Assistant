export default function ChartCard({ title, children }) {
  return (
    <div style={{
      background: "#ffffff",
      padding: "20px",
      borderRadius: "8px",
      marginBottom: "20px"
    }}>
      <h4 style={{ marginBottom: "10px" }}>{title}</h4>
      {children}
    </div>
  );
}
