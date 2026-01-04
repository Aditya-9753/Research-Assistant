import React, { useState, useEffect } from "react";
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement, 
  ArcElement, PointElement, LineElement, Title, Tooltip, Legend, Filler
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export default function UltimateDashboard() {
  const [urlInput, setUrlInput] = useState("");
  const [selectedChartType, setSelectedChartType] = useState("line");
  const [history, setHistory] = useState([]); 
  const [activeData, setActiveData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  // Deep Scan Simulation with Progress
  const handleGenerate = async () => {
    if (!urlInput) return;
    setLoading(true);
    setScanProgress(0);
    
    // Progress Bar Animation
    let interval = setInterval(() => {
      setScanProgress(prev => (prev < 95 ? prev + 5 : prev));
    }, 100);

    try {
      setTimeout(() => {
        clearInterval(interval);
        const result = {
          id: Date.now(),
          ticker: urlInput.replace('https://', '').split(/[./]/)[1]?.toUpperCase() || "SOURCE_SCAN",
          url: urlInput,
          date: new Date().toLocaleTimeString(),
          labels: ["Analysis", "Risk", "Growth", "Sentiment", "Liquidity", "Impact"],
          values: [Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100],
          insights: [
            "Neural networks detected bullish divergence.",
            "Structural risks identified in Q3 forecast.",
            "Entity mapping linked 14 offshore subsidiaries."
          ],
          metrics: { volatility: "High", strength: "92%", alpha: "+4.2" }
        };

        setActiveData(result);
        setHistory([result, ...history]);
        setLoading(false);
        setScanProgress(100);
      }, 2000);
    } catch (err) {
      setLoading(false);
    }
  };

  const chartConfig = {
    labels: activeData?.labels || [],
    datasets: [{
      label: 'Intelligence Depth',
      data: activeData?.values || [],
      backgroundColor: selectedChartType === 'pie' 
        ? ['#38bdf8', '#818cf8', '#c084fc', '#fb7185', '#fbbf24', '#2dd4bf'] 
        : 'rgba(56, 189, 248, 0.15)',
      borderColor: '#38bdf8',
      borderWidth: 3,
      pointBackgroundColor: '#38bdf8',
      pointBorderColor: '#fff',
      pointHoverRadius: 8,
      tension: 0.4,
      fill: true,
    }]
  };

  return (
    <div style={styles.container}>
      {/* 1. NEON SIDEBAR */}
      <div style={styles.sidebar}>
        <div style={styles.logo}>Ω</div>
        {['🌐', '📊', '⚡', '🛡️', '⚙️'].map((icon, i) => (
          <div key={i} style={styles.navIcon}>{icon}</div>
        ))}
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* 2. COMMAND HEADER */}
        <header style={styles.header}>
          <div style={styles.searchCluster}>
            <div style={styles.inputWrapper}>
              <span style={{marginRight: '10px', opacity: 0.5}}>🔍</span>
              <input 
                style={styles.input}
                placeholder="Initialize Forensic Scan (Paste URL)..."
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
              />
            </div>
            <select style={styles.select} onChange={(e) => setSelectedChartType(e.target.value)}>
              <option value="line">Vector Line</option>
              <option value="bar">Matrix Bar</option>
              <option value="pie">Radial Pie</option>
            </select>
            <button onClick={handleGenerate} style={styles.scanBtn}>
              {loading ? `Scanning ${scanProgress}%` : 'Deep Analyze'}
            </button>
          </div>
        </header>

        {/* 3. MAIN INTERFACE */}
        <div style={styles.workspace}>
          
          {/* LEFT: DATA HISTORY & METRICS */}
          <div style={styles.leftPanel}>
            <div style={styles.glassCard}>
              <h4 style={styles.cardTitle}>Source DNA History</h4>
              {history.map((h) => (
                <div key={h.id} onClick={() => setActiveData(h)} style={{
                  ...styles.historyItem,
                  background: activeData?.id === h.id ? 'rgba(56, 189, 248, 0.1)' : 'transparent',
                  borderColor: activeData?.id === h.id ? '#38bdf8' : '#1e293b'
                }}>
                  <div style={{fontWeight: 'bold'}}>{h.ticker}</div>
                  <div style={{fontSize: '10px', opacity: 0.5}}>{h.date}</div>
                </div>
              ))}
            </div>
          </div>

          {/* CENTER: PRIMARY VISUALIZATION */}
          <div style={styles.centerPanel}>
            {activeData ? (
              <div style={styles.mainChartCard}>
                <div style={styles.chartHeader}>
                  <div>
                    <h2 style={{margin: 0}}>{activeData.ticker}</h2>
                    <span style={{fontSize: '11px', color: '#64748b'}}>{activeData.url}</span>
                  </div>
                  <div style={styles.liveBadge}>LIVE FORENSICS</div>
                </div>
                
                <div style={{ flex: 1, marginTop: '20px' }}>
                  {selectedChartType === 'line' && <Line data={chartConfig} options={styles.chartOptions} />}
                  {selectedChartType === 'bar' && <Bar data={chartConfig} options={styles.chartOptions} />}
                  {selectedChartType === 'pie' && <Pie data={chartConfig} options={{maintainAspectRatio: false}} />}
                </div>

                <div style={styles.metricsGrid}>
                  <div style={styles.miniMetric}><span>VOLATILITY</span><strong>{activeData.metrics.volatility}</strong></div>
                  <div style={styles.miniMetric}><span>CONFIDENCE</span><strong>{activeData.metrics.strength}</strong></div>
                  <div style={styles.miniMetric}><span>ALPHA BT</span><strong>{activeData.metrics.alpha}</strong></div>
                </div>
              </div>
            ) : (
              <div style={styles.emptyState}>
                <div style={styles.radar}></div>
                <h3>System Ready</h3>
                <p>Awaiting input for deep-layer data extraction</p>
              </div>
            )}
          </div>

          {/* RIGHT: INTELLIGENCE FEED */}
          <div style={styles.rightPanel}>
            <div style={styles.glassCard}>
              <h4 style={styles.cardTitle}>Extracted Intelligence</h4>
              {activeData?.insights.map((text, i) => (
                <div key={i} style={styles.insightCard}>
                  <div style={styles.insightDot}></div>
                  <p style={{margin: 0, fontSize: '13px', lineHeight: '1.5'}}>{text}</p>
                </div>
              ))}
              
              <h4 style={{...styles.cardTitle, marginTop: '30px'}}>Anomaly Shield</h4>
              <div style={styles.anomalyBox}>
                No logical contradictions found in current dataset. Source verified.
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

/* --- THE STYLING ENGINE --- */
const styles = {
  container: { display: 'flex', height: '100vh', width: '100vw', background: '#020617', color: '#f8fafc', overflow: 'hidden', fontFamily: "'Segoe UI', Roboto, sans-serif" },
  sidebar: { width: '70px', background: '#070a13', borderRight: '1px solid #1e293b', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '25px 0' },
  logo: { fontSize: '28px', color: '#38bdf8', fontWeight: 'bold', textShadow: '0 0 15px #38bdf8', marginBottom: '40px' },
  navIcon: { marginBottom: '35px', fontSize: '20px', cursor: 'pointer', transition: '0.3s', ':hover': { transform: 'scale(1.2)' } },
  
  header: { height: '80px', background: '#0f172a', borderBottom: '1px solid #1e293b', display: 'flex', alignItems: 'center', padding: '0 40px' },
  searchCluster: { display: 'flex', flex: 1, gap: '15px', maxWidth: '1000px' },
  inputWrapper: { flex: 1, display: 'flex', alignItems: 'center', background: '#020617', border: '1px solid #334155', borderRadius: '12px', padding: '0 20px' },
  input: { background: 'transparent', border: 'none', color: '#fff', width: '100%', padding: '12px 0', outline: 'none', fontSize: '14px' },
  select: { background: '#1e293b', color: '#fff', border: 'none', padding: '0 15px', borderRadius: '12px', outline: 'none' },
  scanBtn: { background: 'linear-gradient(135deg, #38bdf8 0%, #818cf8 100%)', color: '#020617', padding: '0 30px', borderRadius: '12px', fontWeight: '900', border: 'none', cursor: 'pointer' },

  workspace: { flex: 1, display: 'flex', padding: '20px', gap: '20px', overflow: 'hidden' },
  leftPanel: { width: '260px', display: 'flex', flexDirection: 'column' },
  centerPanel: { flex: 1, display: 'flex', flexDirection: 'column' },
  rightPanel: { width: '300px', display: 'flex', flexDirection: 'column' },

  glassCard: { background: 'rgba(15, 23, 42, 0.6)', border: '1px solid #1e293b', borderRadius: '20px', padding: '20px', height: '100%', overflowY: 'auto' },
  cardTitle: { fontSize: '12px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '20px', marginTop: 0 },
  historyItem: { padding: '15px', borderRadius: '12px', border: '1px solid #1e293b', marginBottom: '10px', cursor: 'pointer', transition: '0.2s' },
  
  mainChartCard: { flex: 1, background: '#0f172a', border: '1px solid #1e293b', borderRadius: '24px', padding: '30px', display: 'flex', flexDirection: 'column' },
  chartHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' },
  liveBadge: { background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', padding: '5px 12px', borderRadius: '20px', fontSize: '10px', fontWeight: 'bold', border: '1px solid #22c55e' },
  
  metricsGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '30px' },
  miniMetric: { background: '#020617', padding: '15px', borderRadius: '15px', textAlign: 'center', border: '1px solid #1e293b' },
  insightCard: { display: 'flex', gap: '15px', marginBottom: '15px', background: 'rgba(255,255,255,0.02)', padding: '15px', borderRadius: '15px' },
  insightDot: { width: '8px', height: '8px', borderRadius: '50%', background: '#38bdf8', marginTop: '5px' },
  anomalyBox: { background: 'rgba(34, 197, 94, 0.05)', color: '#4ade80', padding: '15px', borderRadius: '12px', fontSize: '12px', border: '1px solid rgba(34, 197, 94, 0.1)' },

  emptyState: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' },
  chartOptions: { maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { grid: { color: '#1e293b' } }, x: { grid: { display: false } } } }
};