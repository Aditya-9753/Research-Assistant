import { useState } from "react";
import API from "../services/api";
import UrlInput from "../components/UrlInput";
import ModeSelector from "../components/ModeSelector";
import ResultCard from "../components/ResultCard";
import Loader from "../components/Loader";
import "./Dashboard.css";

export default function Dashboard() {
  const [url, setUrl] = useState("");
  const [mode, setMode] = useState("summary");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    if (!url.startsWith("http")) {
      alert("Please enter a valid URL (http/https)");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const res = await API.post("/research", { url, mode });
      setResult(res.data);
      return;
    } catch {
      console.warn("Backend unavailable → Using frontend analysis");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-card">
        {/* HEADER */}
        <div className="dashboard-header">
          <h1 className="dashboard-title">
            AI Equity Research Assistant
          </h1>
          <p className="dashboard-subtitle">
            Analyze real web content with AI-style insights
          </p>
        </div>

        {/* INPUT SECTION */}
        <div className="dashboard-input-box">
          <UrlInput value={url} onChange={setUrl} />
          <ModeSelector value={mode} onChange={setMode} />

          <button
            className="dashboard-button"
            onClick={handleAnalyze}
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Run Analysis"}
          </button>
        </div>

        {/* RESULT */}
        <div className="dashboard-result">
          {loading && <Loader />}
          {result && <ResultCard data={result} />}
        </div>
      </div>

      {/* FOOTER */}
      <p className="dashboard-footer">
        © {new Date().getFullYear()} AI Equity Research Assistant
      </p>
    </div>
  );
}
