// services/research.js

const BASE_URL = "http://127.0.0.1:8000/api/v1";

export const ResearchService = {
  async startResearch(payload = {}) {
    // --------------------------
    // Frontend validation
    // --------------------------
    if (!payload.query) {
      throw new Error("URL is required for research");
    }

    try {
      // --------------------------
      // EXACT backend endpoint
      // POST /api/v1/research
      // --------------------------
      const response = await fetch(`${BASE_URL}/research`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // 🔥 Backend expects THIS schema
          url: payload.query,
          mode: payload.mode || "summary", // default mode
        }),
      });

      // --------------------------
      // Error handling
      // --------------------------
      if (!response.ok) {
        let message = "Backend returned an error";

        try {
          const err = await response.json();
          message = err.detail || err.message || message;
        } catch {
          // Non-JSON error response
        }

        throw new Error(message);
      }

      // --------------------------
      // Success
      // --------------------------
      return await response.json();

    } catch (error) {
      console.error("ResearchService Error:", error);

      throw new Error(
        error.message ||
        "Connection failed. Check if FastAPI backend is running."
      );
    }
  },
};
