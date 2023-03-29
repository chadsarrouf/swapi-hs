import { useState, useEffect } from 'react';
import Pilots from '../types/Pilots';
import Starships from '../types/Starships';

interface FetchDataResult {
  starships: Starships[];
  pilots: Pilots[];
  loading: boolean;
  error: string | null;
}

const useFetchSwapiData = (): FetchDataResult => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Record<string, any>>({});

  const [starships, setStarships] = useState<Starships[]>([]);
  const [pilots, setPilots] = useState<Pilots[]>([]);

  useEffect(() => {
    fetchStarshipsData();
    fetchPilotsData();
  }, []);

  const fetchStarshipsData = async () => {
    try {
      const response = await fetch('');
      if (!response.ok) throw new Error('Error fetching data');
      const data = await response.json();
      setStarships(data);
      setLoading(false);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
      setLoading(false);
    }
  };

  const fetchPilotsData = async () => {
    try {
      const response = await fetch('');
      if (!response.ok) throw new Error('Error fetching data');
      const data = await response.json();
      setPilots(data);
      setLoading(false);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
      setLoading(false);
    }
  };


  return { starships, pilots, loading, error };
};

export default useFetchSwapiData;
