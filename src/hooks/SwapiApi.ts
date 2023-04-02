import { useState, useEffect } from 'react';
import Pilot from '../types/Pilot';
import Starship from '../types/Starship';

interface FetchDataResult {
  starships: Starship[];
  pilots: Pilot[];
  loading: boolean;
  error: string | null;
  starshipsCount: number;
  pilotsCount: number;
}

interface fetchResourceResult {
  resource: Starship | Pilot | undefined;
  loading: boolean;
  error: string | null;
}

const useFetchAllData = (): FetchDataResult => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Record<string, any>>({});

  const [starships, setStarships] = useState<Starship[]>([]);
  const [starshipsCount, setStarshipsCount] = useState<number>(0);
  const [pilots, setPilots] = useState<Pilot[]>([]);
  const [pilotsCount, setPilotsCount] = useState<number>(0);

  useEffect(() => {
      console.log('begin fetching all!');    
      fetchStarshipsData();
      fetchPilotsData();
  }, []);

  const fetchStarshipsData = async () => {
    try {       
      let startshipData: Starship[] = [];
      let nextPage = `https://swapi.dev/api/starships/?page=1`;
      setLoading(true);
      while (nextPage) {
        const response = await fetch(nextPage);

        if (!response.ok) throw new Error('Error fetching data');

        const { count, next, results } = await response.json();
    
        startshipData = [...startshipData, ...results];
        
        nextPage = next;

        if (starshipsCount == 0) {
          setStarshipsCount(count);
        }

      } 
      setStarships(startshipData);
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
      let pilotData: Pilot[] = [];
      // in a larger project, we would add url values to .env file
      let nextPage = `https://swapi.dev/api/people/?page=1`;
      setLoading(true);
      while (nextPage) {
        const response = await fetch(nextPage);

        if (!response.ok) throw new Error('Error fetching data');

        const { count, next, results } = await response.json();
    
        pilotData = [...pilotData, ...results];
        nextPage = next;

        if (pilotsCount == 0) {
          setPilotsCount(count);
        }
      } 
      setPilots(pilotData);
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

  return { starships, pilots, loading, error, starshipsCount, pilotsCount };
};


const useFetchSwapiData = (nextPageNumber: number): FetchDataResult => {
  console.log('begin fetching all!');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Record<string, any>>({});

  const [starships, setStarships] = useState<Starship[]>([]);
  const [starshipsCount, setStarshipsCount] = useState<number>(0);
  const [pilots, setPilots] = useState<Pilot[]>([]);
  const [pilotsCount, setPilotsCount] = useState<number>(0);

  useEffect(() => {
      fetchStarshipsData();
      fetchPilotsData();
  }, [nextPageNumber]);

  const fetchStarshipsData = async () => {
    try {       
      let index = 1;
      let startshipData: Starship[] = [];

      // swapi api limits us to 10 objects per get request
      // we want to retrieve 20 objects, so we make two calls = 2x10
      // my pagination numbers are doubled, since im doing a double call
      const convertedNumber = nextPageNumber*2 -1 ;
      // in a larger project, we would add url values to .env file
      let nextPage = `https://swapi.dev/api/starships/?page=${convertedNumber}`;
      
      setLoading(true);
      
      while (nextPage && index <= 2) {
        const response = await fetch(nextPage);

        if (!response.ok) throw new Error('Error fetching data');

        const { count, next, results } = await response.json();
    
        startshipData = [...startshipData, ...results];
        
        nextPage = next;
        index ++;

        if (starshipsCount == 0) {
          setStarshipsCount(count);
        }

      } 
      setStarships(startshipData);
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
      let index = 1;
      let pilotData: Pilot[] = [];

      // swapi api limits us to 10 objects per get request
      // we want to retrieve 20 objects, so we make two calls = 2x10
      // my pagination numbers are doubled, since im doing a double call
      const convertedNumber = nextPageNumber*2 -1 ;
      // in a larger project, we would add url values to .env file
      let nextPage = `https://swapi.dev/api/people/?page=${convertedNumber}`;
      setLoading(true);
      while (nextPage && index <= 2) {
        const response = await fetch(nextPage);

        if (!response.ok) throw new Error('Error fetching data');

        const { count, next, results } = await response.json();
    
        pilotData = [...pilotData, ...results];
        nextPage = next;

        index ++;

        if (pilotsCount == 0) {
          setPilotsCount(count);
        }
      } 
      setPilots(pilotData);
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

  return { starships, pilots, loading, error, starshipsCount, pilotsCount };
};

const useFetchResource = (type: "starships" | "pilots", resourceId: string, abortCall: boolean): fetchResourceResult => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [resource, setResource] = useState<Starship | Pilot>();
  
  useEffect(() => {
    if (abortCall) return;
    fetchResource(type, resourceId);
  }, []);

  const fetchResource = async (resourceType: "starships" | "pilots", resourceId: string) => {
    const resourceMapping = {
      pilots: "people",
      starships: "starships"
    };

    try {
      
      // in a larger project, we would add url values to .env file
      const fetchUrl = `https://swapi.dev/api/${resourceMapping[resourceType]}/${resourceId}`;
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


export { useFetchSwapiData, useFetchResource, useFetchAllData } ;
