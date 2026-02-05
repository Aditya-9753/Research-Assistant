// services/research.js

const BASE_URL = "http://127.0.0.1:8000/api/v1";

export const ResearchService = {
  async startResearch(payload = {}) {
    // 1. Validation Logic
    // Backend 'url' expect kar raha hai, aap 'query' bhej rahe ho frontend se
    if (!payload.url && !payload.query) {
      throw new Error("A valid URL is required to start research.");
    }

    const finalUrl = payload.url || payload.query;

    try {
      // API call
      const response = await fetch(`${BASE_URL}/research`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          // 🔥 Backend schema matching:
          url: finalUrl, 
          mode: payload.mode || "summary", 
        }),
      });

      // 2. Error handling (Parsing FastAPI specific error details)
      if (!response.ok) {
        let message = `Error: ${response.status}`;
        try {
          const err = await response.json();
          // FastAPI validation errors 'detail' key mein aate hain
          message = Array.isArray(err.detail) 
            ? err.detail[0].msg 
            : err.detail || message;
        } catch (e) {
          /* Fallback for non-JSON errors */
        }
        throw new Error(message);
      }

      // 3. Success
      return await response.json();

    } catch (error) {
      console.error("ResearchService Error:", error);
      
      // Connection Refused handling
      if (error.message.includes("Failed to fetch")) {
        throw new Error("Backend server is not running on http://127.0.0.1:8000");
      }
      
      throw error;
    }
  },
};