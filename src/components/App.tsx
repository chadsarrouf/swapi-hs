import React, { useState, useContext, useEffect, useMemo } from 'react';
import '../App.scss';
import { DataContext } from '../contexts/DataContext';
import useFetchSwapiData from '../hooks/SwapiApi';
import logo from '../assets/logo.png';
import ship from '../assets/ship.png';
import Card from './Card';
import CardContainer from './CardContainer';

const App = () => {
  const [displayedEntity, setDisplayedEntity] = useState<'pilots' | 'starships'>('starships');
  const { setPilots, setStarships } = useContext(DataContext);
  const { starships, pilots, loading, error } = useFetchSwapiData();
  
  useEffect(() => {
    setPilots(pilots);
    setStarships(starships);
  }, [starships, pilots, setPilots, setStarships]);

  const cardData = useMemo(() => {
    return displayedEntity === 'starships' ? pilots : starships;
  }, [displayedEntity, pilots, starships]);

  const handleEntityChange = (event: React.MouseEvent<HTMLHeadingElement>) => {
    const selectedEntity = event.currentTarget.getAttribute('data-value') as 'pilots' | 'starships';
    setDisplayedEntity(selectedEntity);
  };

  return (
    <div className="App">
      <img src={ship} className="ship"  alt="loader" />
    
      <header className="header">
        <img src={logo} className="logo"  alt="logo" />
      </header> 

      

      <section className="content">

        <div className="tab-container flex flex-row justify-evenly flex-wrap">
          <h1 
            data-value="starships" 
            onClick={handleEntityChange} 
            className={ displayedEntity == 'starships' ? ' active' : ''}
          > 
            Starships
          </h1> 
          <h1 
            data-value="pilots" 
            onClick={handleEntityChange} 
            className={ displayedEntity == 'pilots' ? ' active' : ''}
          > 
            Pilots
          </h1> 
        </div>

        <CardContainer cardData={cardData} />

      </section>
    </div>
  );
}

export default App;
