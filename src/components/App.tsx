import { useContext, useEffect, useRef, useState } from 'react';
import '../App.scss';
import { DataContext } from '../contexts/DataContext';
import Dashboard from './Dashboard';
import Header from './Header';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Starship from './Starship';
import Pilot from './Pilot';
import { useFetchAllData } from '../hooks/SwapiApi';

const App = () => {
  const audioRef = useRef(null);
  <audio ref={audioRef} src="/starwars.mp3" loop autoPlay />        

  const { starships, pilots, loading, } = useFetchAllData();
  const {setPilots, setStarships, setLoading} = useContext(DataContext);
  const [hasAnimationRun, setHasAnimationRun] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setStarships(starships);
    setPilots(pilots);
    setLoading(loading);
  }, [starships, setStarships, pilots, setPilots, loading, setLoading]);

  return (  
    <div className="App">   
      <div>
        <p  
          onAnimationEnd={() => setHasAnimationRun(true)}
          className={`${location.pathname === '/' && !hasAnimationRun ? 'crawl' : ''} crawlText`}
        >
          by Chad Sarrouf
        </p>
      </div>
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
