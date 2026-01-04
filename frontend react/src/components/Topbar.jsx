export default function Topbar({ title }) {
  return (
    <div style={{
      padding: "10px 20px",
      borderBottom: "1px solid #e5e7eb",
      marginBottom: "20px"
    }}>
      <h2>{title}</h2>
    </div>
  );
}
