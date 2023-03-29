import React, { createContext, useState } from 'react';
//https://blog.logrocket.com/how-to-use-react-context-typescript/
const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [starships, setStarships] = useState([]);
  const [pilots, setPilots] = useState([]);

  return (
    <DataContext.Provider value={{ starships, setStarships, pilots, setPilots }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;