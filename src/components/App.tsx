import React, { useState, useContext, useEffect, useMemo } from 'react';
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

const App = () => {
  return (  
    <div className="App">    
      <Header/>
        <section className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="pilots" element={<Dashboard />} />
            <Route path="starship/:starshipId" element={<Starship />} />
            <Route path="pilot/:pilotId" element={<Pilot />} />
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
