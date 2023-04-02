import React, { createContext, useState, ReactNode  } from 'react';
import Pilot from '../types/Pilot';
import Starship from '../types/Starship';

interface DataContextState {
  pilots: Pilot[];
  starships: Starship[];
  setPilots: (pilots: Pilot[]) => void;
  setStarships: (starships: Starship[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const DataContext = createContext<DataContextState>({
  pilots: [],
  starships: [],
  setPilots: () => {},
  setStarships: () => {},
  loading: true,
  setLoading: () => {},
});

interface DataProviderProps {
  children: ReactNode;
}

const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [starships, setStarships] = useState<Starship[]>([]);
  const [pilots, setPilots] = useState<Pilot[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [pilotsCount, setPilotsCount] = useState<number>(0);
  const [starshipsCount, setStarshipsCount] = useState<number>(0);

  return (
    <DataContext.Provider value={{ starships, setStarships, pilots, setPilots, loading, setLoading }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider }