import { useState, useEffect } from 'react';
import Pilot from '../types/Pilot';
import Starship from '../types/Starship';

interface FetchDataResult {
  starships: Starship[];
  pilots: Pilot[];
  loading: boolean;
  error: string | null;
}

interface fetchResourceResult {
  resource: Starship | Pilot | undefined;
  loading: boolean;
  error: string | null;
}

const useFetchSwapiData = (): FetchDataResult => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Record<string, any>>({});

  const [starships, setStarships] = useState<Starship[]>([]);
  const [pilots, setPilots] = useState<Pilot[]>([]);

  useEffect(() => {
    fetchStarshipsData();
    fetchPilotsData();
  }, []);

  const fetchStarshipsData = async () => {
    try {
      // in a larger project, we would add url values to .env file
      let nextPage = `https://swapi.dev/api/starships`;
      let count = 1;
      let startshipData: Starship[] = [];
      while (nextPage && count <= 2) {
        const response = await fetch(nextPage);

        if (!response.ok) throw new Error('Error fetching data');

        const { next, results } = await response.json();
    
        startshipData = [...startshipData, ...results];
        nextPage = next;
        count ++;
      } 
      setStarships(startshipData);
      console.log('get starships count: ' + count);
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
      // in a larger project, we would add url values to .env file
      let nextPage = `https://swapi.dev/api/people/`;
      let count = 1;
      let pilotData: Pilot[] = [];
      while (nextPage && count <= 2) {
        const response = await fetch(nextPage);

        if (!response.ok) throw new Error('Error fetching data');

        const { next, results } = await response.json();
    
        pilotData = [...pilotData, ...results];
        nextPage = next;
        count ++;
      } 
      setPilots(pilotData);
      console.log('get pilots count: ' + count);
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

const useFetchResource = (type: "starships" | "people", resourceId: string): fetchResourceResult => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [resource, setResource] = useState<Starship | Pilot>();
  
  useEffect(() => {
    fetchResource(type, resourceId);
  }, []);

  const fetchResource = async (resourceType: "starships" | "people", resourceId: string) => {
    try {
      // in a larger project, we would add url values to .env file
      const fetchUrl = `https://swapi.dev/api/${resourceType}/${resourceId}`;
      const response = await fetch(fetchUrl);
      const resource = await response.json();
      setResource(resource);
      throw new Error('Error fetching data');
      if (!response.ok) throw new Error('Error fetching data');
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

  return { resource, loading, error };
};


export {useFetchSwapiData, useFetchResource} ;
