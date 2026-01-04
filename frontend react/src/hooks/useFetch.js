import { useState, useCallback } from "react";

/**
 * useFetch Hook: 
 * Ye hook loading, error aur data ko handle karta hai taaki aapko 
 * har page par bar-bar states na banani padein.
 */
export const useFetch = () => {
  const [data, setData] = useState(null);       // API se aaya hua real data
  const [loading, setLoading] = useState(false); // Jab tak data aa raha hai
  const [error, setError] = useState(null);     // Agar API fail ho jaye

  // request function: Isme hum service method aur uske parameters pass karte hain
  const request = useCallback(async (serviceMethod, ...params) => {
    setLoading(true);
    setError(null); // Purana error clear karein
    
    try {
      // Service call karein (e.g. AnalysisService.getFullHistory)
      const result = await serviceMethod(...params);
      setData(result);
      return result; // Result return karein taaki component use kar sake
    } catch (err) {
      const msg = err.message || "Kuch galat ho gaya!";
      setError(msg);
      throw err; // Component ko batayein ki error aaya hai
    } finally {
      setLoading(false); // Chaahe success ho ya fail, loading band karein
    }
  }, []);

  // In charo chizo ko return karte hain components mein use karne ke liye
  return { data, loading, error, request, setData };
};