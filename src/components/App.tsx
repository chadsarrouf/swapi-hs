import React, { useState, useContext, useEffect, useMemo } from 'react';
import '../App.scss';
import { DataContext } from '../contexts/DataContext';
import { useFetchSwapiData } from '../hooks/SwapiApi';
import logo from '../assets/logo.png';
import ship from '../assets/ship.png';
import Home from './Home';
import Card from './Card';
import CardContainer from './CardContainer';
import Header from './Header';
import { Routes, Route } from 'react-router-dom';
import Starship from './Starship';

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
    
      <Header/>

      <section className="content">

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="starship/:starshipId" element={<Starship />} />
          <Route path="pilot/:pilotId" element={<Starship />} />
        </Routes>

      </section>
    </div>
  );
}

export default App;
