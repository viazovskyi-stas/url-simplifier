import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useGetSimplifiedLink(hash: string) {
  const [response, setResponse] = useState<{ original_url: string } | null>(
    null
  );
  const [error, setError] = useState('');
  const [loading, setloading] = useState(true);

  const fetchData = () => {
    axios
      .post('/api/get-link', { hash })
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setloading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // custom hook returns value
  return { response, error, loading };
}
