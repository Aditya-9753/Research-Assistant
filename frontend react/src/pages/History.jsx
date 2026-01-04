import React, { useState, useEffect } from "react";
import { ResearchService } from "../services/research";

export default function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        setLoading(true);
        const data = await ResearchService.getAllHistory(); 
        if (data) setHistory(data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    loadHistory();
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.sidebarSpace} />
      
      <div style={styles.content}>
        <header style={styles.header}>
          <div>
            <h1 style={styles.title}>System Logs</h1>
            <p style={styles.subtitle}>Recent research activities and summaries</p>
          </div>
          <div style={styles.status}>
             <span style={styles.dot}></span> Live Backend: 127.0.0.1:8000
          </div>
        </header>

        {loading ? (
          <div style={styles.msg}>Database se connect ho raha hai...</div>
        ) : history.length > 0 ? (
          <div style={styles.table}>
            <div style={styles.tableHeader}>
              <span>SEARCHED SOURCE & DESCRIPTION</span>
              <span>TIMESTAMP</span>
            </div>
            {history.map((item, i) => (
              <div key={i} style={styles.rowWrapper}>
                <div style={styles.rowMain}>
                  <div style={styles.urlCol}>
                    <span style={styles.icon}>🔗</span>
                    <span style={styles.urlText}>{item.url || item.query}</span>
                  </div>
                  <div style={styles.timeCol}>
                    {item.created_at || "Just now"}
                  </div>
                </div>
                
                {/* Short Description Section */}
                <div style={styles.descriptionBox}>
                   <div style={styles.descriptionText}>
                     <strong style={{color: '#38bdf8', fontSize: '11px'}}>SUMMARY: </strong>
                     {item.description || "No description available for this entry."}
                   </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={styles.emptyCard}>
             <div style={{fontSize: '40px'}}>📭</div>
             <h3>No Logs Found</h3>
             <p>Aapki history filhaal khali hai.</p>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: { display: "flex", minHeight: "100vh", background: "#020617", color: "#f8fafc", fontFamily: 'sans-serif' },
  sidebarSpace: { width: "105px", borderRight: "1px solid #1e293b" },
  content: { flex: 1, padding: "40px", maxWidth: "1200px" },
  header: { marginBottom: "40px", display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' },
  title: { fontSize: "28px", fontWeight: "bold", margin: 0 },
  subtitle: { color: "#64748b", fontSize: "14px", marginTop: "5px" },
  status: { fontSize: "12px", color: "#10b981", background: "#10b9811a", padding: "6px 14px", borderRadius: "20px", display: 'flex', alignItems: 'center', height: 'fit-content' },
  dot: { width: "8px", height: "8px", background: "#10b981", borderRadius: "50%", marginRight: "8px" },
  
  table: { background: "#0f172a", borderRadius: "16px", border: "1px solid #1e293b", overflow: "hidden", boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" },
  tableHeader: { display: "flex", justifyContent: "space-between", padding: "18px 25px", background: "#1e293b", fontSize: "11px", fontWeight: "800", color: "#94a3b8", letterSpacing: "1.5px" },
  rowWrapper: { borderBottom: "1px solid #1e293b", padding: "15px 0", transition: "0.2s", ":hover": { background: "#1e293b33" } },
  rowMain: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 25px" },
  urlCol: { display: "flex", alignItems: "center", gap: "12px" },
  icon: { fontSize: "18px" },
  urlText: { fontSize: "15px", color: "#f1f5f9", fontWeight: "500" },
  timeCol: { fontSize: "12px", color: "#64748b" },
  
  descriptionBox: { padding: "10px 25px 5px 55px" },
  descriptionText: { fontSize: "13px", color: "#94a3b8", lineHeight: "1.6", background: "#1e293b4d", padding: "10px", borderRadius: "8px" },
  
  msg: { textAlign: "center", marginTop: "100px", color: "#38bdf8" },
  emptyCard: { textAlign: "center", marginTop: "100px", padding: "60px", border: "2px dashed #1e293b", borderRadius: "24px", color: "#64748b" }
};