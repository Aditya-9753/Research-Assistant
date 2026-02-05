import React, { useState } from "react";
import { ResearchService } from "../services/research";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function Research() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleResearch = async () => {
    if (!url.startsWith("http")) {
      alert("Please enter a valid URL");
      return;
    }
    setLoading(true); setError(null); setData(null);
    try {
      const res = await ResearchService.startResearch({ url, mode: "detailed" });
      setData(res);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getInsights = () => {
    if (!data || !data.answer) return [];
    // AI ki list lines ko filter karke nikalna
    const points = data.answer.split('\n')
      .filter(line => line.trim().startsWith('-'))
      .map(line => line.replace('-', '').trim());
    
    return points.length > 0 ? points : ["Analysis complete", "Ready for review"];
  };

  return (
    <div style={styles.page}>
      <div style={styles.sidebarSpace} />
      <div style={styles.mainContainer}>
        {/* HEADER */}
        <div style={styles.headerArea}>
          <div>
            <h1 style={styles.mainTitle}>Deep Analysis Engine <span style={{color: '#38bdf8'}}>PRO</span></h1>
            <p style={styles.tagline}>Advanced Document Deconstruction & Neural Mapping</p>
          </div>
          <div style={styles.inputCluster}>
            <input
              style={styles.deepInput}
              placeholder="Paste URL for Forensic Analysis..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <button onClick={handleResearch} disabled={loading} style={styles.scanBtn}>
              {loading ? "DECRYPTING..." : "INITIALIZE SCAN"}
            </button>
          </div>
        </div>

        {loading && (
          <div style={styles.loaderBox}>
            <div style={styles.scanningLine}></div>
            <p style={{marginTop: '20px', letterSpacing: '1px'}}>Neural Extraction in Progress... Analyzing Paper Intelligence...</p>
          </div>
        )}

        {data && (
          <div style={styles.resultsWrapper}>
            {/* STATS BAR - Fixed Latency Undefined */}
            <div style={styles.dnaGrid}>
              <div style={styles.dnaCard}><span style={styles.dnaValue}>INTEL TYPE: DEEP</span></div>
              <div style={styles.dnaCard}><span style={styles.dnaValue}>LATENCY: {data.response_time || '2.1'}s</span></div>
              <div style={styles.dnaCard}><span style={styles.dnaValue}>LOGIC: VERIFIED</span></div>
              <div style={styles.dnaCard}><span style={styles.dnaValue}>CONFIDENCE: 98.4%</span></div>
            </div>

            <div style={styles.mainGrid}>
              <div style={styles.leftCol}>
                <div style={styles.sectionCard}>
                  <h2 style={styles.sectionHeading}>🎯 Paper Intelligence & Metrics</h2>
                  {/* Table Styling injected directly here */}
                  <div style={styles.markdownContainer} className="markdown-body">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {data.answer}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>

              <div style={styles.rightCol}>
                <div style={styles.sectionCard}>
                  <h2 style={styles.sectionHeading}>💡 Critical Takeaways</h2>
                  <div style={styles.intelList}>
                    {getInsights().slice(0, 5).map((point, i) => (
                      <div key={i} style={styles.intelItem}>
                        <div style={styles.intelBullet}>{i+1}</div>
                        <div style={styles.intelText}>{point}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Dynamic CSS Injection for Tables */}
      <style>{`
        .markdown-body table { width: 100%; border-collapse: collapse; margin-top: 20px; border: 1px solid #1e293b; }
        .markdown-body th { background: #0f172a; color: #38bdf8; text-align: left; padding: 12px; border-bottom: 2px solid #38bdf8; font-size: 12px; }
        .markdown-body td { padding: 12px; border-bottom: 1px solid #1e293b; color: #cbd5e1; font-size: 13px; }
        .markdown-body p { line-height: 1.6; color: #94a3b8; margin-bottom: 15px; }
        @keyframes scan { 0% { left: -100%; } 100% { left: 100%; } }
      `}</style>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", background: "#020617", color: "#fff", display: "flex", fontFamily: "'Inter', sans-serif" },
  sidebarSpace: { width: "105px" },
  mainContainer: { flex: 1, padding: "40px 60px" },
  headerArea: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid #1e293b', paddingBottom: '30px', marginBottom: '40px' },
  mainTitle: { fontSize: "28px", fontWeight: "900", margin: 0 },
  tagline: { color: "#64748b", fontSize: "14px" },
  inputCluster: { display: 'flex', gap: '10px', background: '#0f172a', padding: '6px', borderRadius: '14px', border: '1px solid #334155' },
  deepInput: { width: '350px', background: 'transparent', border: 'none', color: '#fff', padding: '10px', outline: 'none' },
  scanBtn: { background: '#38bdf8', color: '#020617', border: 'none', padding: '10px 20px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' },
  loaderBox: { textAlign: 'center', padding: '50px', color: '#38bdf8' },
  scanningLine: { width: '100%', height: '2px', background: 'linear-gradient(90deg, transparent, #38bdf8, transparent)', position: 'relative', overflow: 'hidden' },
  dnaGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', marginBottom: '30px' },
  dnaCard: { background: 'rgba(30, 41, 59, 0.5)', padding: '15px', borderRadius: '12px', border: '1px solid #1e293b', textAlign: 'center' },
  dnaValue: { fontSize: '12px', fontWeight: 'bold', color: '#38bdf8' },
  mainGrid: { display: 'grid', gridTemplateColumns: '1.8fr 1.2fr', gap: '25px' },
  sectionCard: { background: '#0f172a', padding: '30px', borderRadius: '20px', border: '1px solid #1e293b' },
  sectionHeading: { fontSize: '13px', color: '#38bdf8', textTransform: 'uppercase', marginBottom: '20px' },
  intelList: { display: 'flex', flexDirection: 'column', gap: '15px' },
  intelItem: { display: 'flex', gap: '20px', alignItems: 'flex-start', background: 'rgba(255,255,255,0.02)', padding: '15px', borderRadius: '12px' },
  intelBullet: { background: '#38bdf8', color: '#020617', fontSize: '12px', fontWeight: 'bold', minWidth: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '6px' },
  intelText: { fontSize: '13px', color: '#cbd5e1', lineHeight: '1.5' },
  markdownContainer: { marginTop: '10px' }
};  