import React, { useState, useContext, useEffect, useMemo } from 'react';
import '../App.scss';
import { DataContext } from '../contexts/DataContext';
import Loader from './Loader';
import CardContainer from './CardContainer';
import Pagination from './Pagination';
import { useFetchSwapiData } from '../hooks/SwapiApi';
import { useNavigate, useSearchParams  } from "react-router-dom";
import Pilot from '../types/Pilot';

const Dashboard = () => {
  const [activeResource, setActiveResource] = useState<'pilots' | 'starships'>('pilots');
  const [page, setPage] = useState<number>(1);

  // const { pilots, starships, setPilots, setStarships} = useContext(DataContext);
  const { pilots, starships, setPilots, setStarships } = useContext(DataContext);

  const { starships: starshipsData, pilots: pilotsData, loading, error, starshipsCount, pilotsCount } = useFetchSwapiData(page);
  const navigate = useNavigate();
  
  const [searchParams, setSearchParams] = useSearchParams();
  const type = searchParams?.get("type");

  useEffect(() => {
    if (type == "pilots" || type == "starships") {
      setActiveResource(type as 'pilots' | 'starships');
    } 
  }, [searchParams]);

  useEffect(() => {
    setStarships(starshipsData);
  }, [starshipsData, setStarships]);
  
  useEffect(() => {
    setPilots(pilotsData);
  }, [pilotsData, setPilots]);
  

  const cardData = useMemo(() => {
    return activeResource === 'starships' ? starships : pilots;
    
  }, [activeResource, pilots, starships]);

  const handleEntityChange = (event: React.MouseEvent<HTMLHeadingElement>) => {
    const activeResource = event.currentTarget.getAttribute('data-value') as 'pilots' | 'starships';
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("type", activeResource);  
    newSearchParams.set("page", "1");  
    setPage(1);
    setSearchParams(newSearchParams);
    setActiveResource(activeResource);
  };

  return (
    <div className="dashboard">
      <Loader loading={loading} />
    
      <div className="tab-container flex flex-row justify-evenly flex-wrap">
        <h1 
          data-value="pilots" 
          onClick={handleEntityChange} 
          className={ activeResource == 'pilots' ? ' active' : ''}
        > 
          Pilots
        </h1> 
        <h1 
          data-value="starships" 
          onClick={handleEntityChange} 
          className={ activeResource == 'starships' ? ' active' : ''}
        > 
          Starships
        </h1> 
      </div>
      { !loading && 
        <>
          <CardContainer resource={activeResource} cardData={cardData} />
          <Pagination count={activeResource == 'starships' ? starshipsCount : pilotsCount} page={page} setPage={setPage} />
        </>
      }
    </div>
  );
}

export default Dashboard;
