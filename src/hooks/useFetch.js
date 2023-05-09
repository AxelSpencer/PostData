import { useEffect, useState } from 'react';
import axios from 'axios';

const baseUrl = 'http://localhost:3000';

export const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/${url}`);
        setData(response.data);
      } catch (error) {
        setError(error);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  const executePost = async (data) => {
    try {
      const response = await fetch(`${baseUrl}/${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      setError(error);
      throw error;
    }
  };

  return { data, loading, error, executePost };
};
