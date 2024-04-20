import apiClient from "api";
import { useEffect, useState } from "react";

export default function useApiClinet(url, method, body, params = {}) {
  const [data, setData] = useState({});
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      let response = await apiClient(url, method, body, params);
      setLoading(false);
      setData(response);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { loading, data, error };
}
