import React, { createContext, useState, ReactNode  } from 'react';
import Pilot from '../types/Pilot';
import Starship from '../types/Starship';

interface DataContextState {
  pilots: Pilot[];
  starships: Starship[];
  setPilots: (pilots: Pilot[]) => void;
  setStarships: (starships: Starship[]) => void;
}

const DataContext = createContext<DataContextState>({
  pilots: [],
  starships: [],
  setPilots: () => {},
  setStarships: () => {},
});

interface DataProviderProps {
  children: ReactNode;
}

const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [starships, setStarships] = useState<Starship[]>([]);
  const [pilots, setPilots] = useState<Pilot[]>([]);

  return (
    <DataContext.Provider value={{ starships, setStarships, pilots, setPilots }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider }