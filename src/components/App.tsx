import React, { useState, useContext, useEffect, useMemo, useRef } from 'react';
import '../App.scss';
import { DataContext } from '../contexts/DataContext';
import Dashboard from './Dashboard';
import Card from './Card';
import CardContainer from './CardContainer';
import Header from './Header';
import { Routes, Route, Navigate } from 'react-router-dom';
import Starship from './Starship';
import Pilot from './Pilot';
import Loader from './Loader';
import { useFetchAllData } from '../hooks/SwapiApi';

const App = () => {
  const audioRef = useRef(null);

  <audio ref={audioRef} src="/starwars.mp3" loop autoPlay />        

  const { starships, pilots, loading, error, starshipsCount, pilotsCount } = useFetchAllData();
  const {setPilots, setStarships, setLoading} = useContext(DataContext);


  useEffect(() => {
    setStarships(starships);
    setPilots(pilots);
    setLoading(loading);
  }, [starships, setStarships, pilots, setPilots, setLoading]);

  return (  
    <div className="App">    
      <Header/>
        <section className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="starship/:starshipId" element={<Starship starshipsInMemory={starships.length > 0 } />} />
            <Route path="pilot/:pilotId" element={<Pilot pilotsInMemory={!!pilots.length} />} />
            <Route
                path="*"
                element={<Navigate to="/starships" replace />}
            />
          </Routes>
        </section>
      
    </div>
  );
}

export default App;
