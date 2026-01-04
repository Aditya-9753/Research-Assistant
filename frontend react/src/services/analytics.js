// services/analysis.js

const BASE_URL = "https://your-api.com/api"; // Apni backend URL se replace karein

export const AnalysisService = {
  // 1. Saari purani history fetch karna
  async getFullHistory() {
    try {
      const response = await fetch(`${BASE_URL}/history`);
      if (!response.ok) throw new Error("History fetch failed");
      return await response.json();
    } catch (error) {
      console.error("Service Error:", error);
      return []; // Empty array return karega agar error ho toh
    }
  },

  // 2. Naya chart data generate karna (URL ya Ticker se)
  async generateChart(query, chartType) {
    try {
      const response = await fetch(`${BASE_URL}/generate-chart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, type: chartType }),
      });
      if (!response.ok) throw new Error("Chart generation failed");
      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  // 3. Koi specific analysis delete karna
  async deleteAnalysis(id) {
    try {
      const response = await fetch(`${BASE_URL}/analysis/${id}`, {
        method: "DELETE",
      });
      return response.ok;
    } catch (error) {
      console.error("Delete Error:", error);
      return false;
    }
  }
};