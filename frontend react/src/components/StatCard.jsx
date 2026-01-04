export default function StatCard({ title, value }) {
  return (
    <div style={{
      background: "#f8fafc",
      padding: "16px",
      borderRadius: "8px",
      minWidth: "180px"
    }}>
      <p style={{ color: "#64748b", fontSize: "14px" }}>{title}</p>
      <h3 style={{ fontSize: "24px" }}>{value}</h3>
    </div>
  );
}
