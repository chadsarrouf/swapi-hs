import React, { useState, useContext, useEffect, useMemo } from 'react';
import '../App.scss';
import { DataContext } from '../contexts/DataContext';
import logo from '../assets/logo.png';
import ship from '../assets/ship.png';
import Card from './Card';
import CardContainer from './CardContainer';
import Header from './Header';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  const [activeResource, setActiveResource] = useState<'pilots' | 'starships'>('starships');
  const { pilots, starships, setPilots, setStarships} = useContext(DataContext);
  
  useEffect(() => {
    setPilots(pilots);
    setStarships(starships);
  }, [starships, pilots, setPilots, setStarships]);

  const cardData = useMemo(() => {
    return activeResource === 'starships' ? starships : pilots;
  }, [activeResource, pilots, starships]);

  const handleEntityChange = (event: React.MouseEvent<HTMLHeadingElement>) => {
    const selectedEntity = event.currentTarget.getAttribute('data-value') as 'pilots' | 'starships';
    setActiveResource(selectedEntity);
  };

  return (
    <>
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
    </>
  );
}

export default App;
