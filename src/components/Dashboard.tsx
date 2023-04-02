import React, { useState, useContext, useEffect, useMemo } from 'react';
import '../App.scss';
import { DataContext } from '../contexts/DataContext';
import Loader from './Loader';
import CardContainer from './CardContainer';
import { useFetchSwapiData } from '../hooks/SwapiApi';
import { useNavigate } from "react-router-dom";

const App = () => {
  const [activeResource, setActiveResource] = useState<'pilots' | 'starships'>('starships');
  // const { pilots, starships, setPilots, setStarships} = useContext(DataContext);
  const { setPilots, setStarships } = useContext(DataContext);
  const { starships, pilots, loading, error } = useFetchSwapiData();
  const navigate = useNavigate();
  
  useEffect(() => {
    setPilots(pilots);
    setStarships(starships);
  }, [starships, pilots, setPilots, setStarships]);

  const cardData = useMemo(() => {
    return activeResource === 'starships' ? starships : pilots;
    
  }, [activeResource, pilots, starships]);

  const handleEntityChange = (event: React.MouseEvent<HTMLHeadingElement>) => {
    const activeResource = event.currentTarget.getAttribute('data-value') as 'pilots' | 'starships';
    navigate(`?type=${activeResource}`)
    setActiveResource(activeResource);
  };

  return (
    <div className="dashboard">
      <Loader loading={loading} />
    
      <div className="tab-container flex flex-row justify-evenly flex-wrap">
        <h1 
          data-value="starships" 
          onClick={handleEntityChange} 
          className={ activeResource == 'starships' ? ' active' : ''}
        > 
          Starships
        </h1> 
        <h1 
          data-value="pilots" 
          onClick={handleEntityChange} 
          className={ activeResource == 'pilots' ? ' active' : ''}
        > 
          Pilots
        </h1> 
      </div>

      <CardContainer resource={activeResource} cardData={cardData} />
    </div>
  );
}

export default App;
