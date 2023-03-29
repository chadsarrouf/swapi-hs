import React, { useContext, useEffect } from 'react';
import './App.scss';
import DataContext from './contexts/DataContext';
import useFetchSwapiData from './hooks/SwapiApi';
import logo from './assets/logo.svg';
import ship from './assets/ship.png';
import GradientText from './components/GradientText';



const App = () => {
  const { setPilots, setStarships } = useContext(DataContext);

  const { starships, pilots, loading, error } = useFetchSwapiData();
  
  useEffect(() => {
    setPilots(pilots);
    setStarships(starships);
  }, [starships, pilots, setPilots, setStarships]);

  
  return (
    <div className="App">
      <img src={ship} className="ship"  alt="loader" />
    
      <header className="header">
        <img src={logo} className="logo"  alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <GradientText 
          text="foo"
        />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div className="content" >
        
      </div>      
    </div>
  );
}

export default App;
