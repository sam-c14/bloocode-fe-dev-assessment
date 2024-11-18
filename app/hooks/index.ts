import { useState, useEffect } from "react";

export const useCustomSWR = (url: string, fetcher: any, options: any) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetcher(url);
      setData(response);
      setError(null);
    } catch (err) {
      setError(err as any);
      setData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    if (options.revalidateOnFocus) {
      const handleFocus = () => fetchData();
      window.addEventListener("focus", handleFocus);
      return () => window.removeEventListener("focus", handleFocus);
    }
  }, [url, options.revalidateOnFocus]);

  return { data, error, isLoading, refetch: fetchData };
};
