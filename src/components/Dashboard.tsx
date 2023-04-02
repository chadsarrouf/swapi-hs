import React, { useState, useContext, useEffect, useMemo } from 'react';
import '../App.scss';
import { DataContext } from '../contexts/DataContext';
import Loader from './Loader';
import CardContainer from './CardContainer';
import Pagination from './Pagination';
import { useNavigate, useSearchParams  } from "react-router-dom";
import Pilot from '../types/Pilot';

const Dashboard = () => {
  const [activeResource, setActiveResource] = useState<'pilots' | 'starships'>('pilots');
  const [page, setPage] = useState<number>(1);

  const { pilots, starships, loading } = useContext(DataContext);
  
  const navigate = useNavigate();

  
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
  const type = searchParams?.get("type");
    
    if (type == "pilots" || type == "starships") {
      setActiveResource(type as 'pilots' | 'starships');
    } 

  const page = searchParams?.get("page");

  setPage(parseInt(page ?? "1"));
  }, [searchParams]); 


  const cardData = useMemo(() => {
    // Calculate the starting and ending index for the current page
    const startIndex = (page - 1) * 20;
    const endIndex = page * 20;
  
    // Return the slice of the starships or pilots array based on the activeResource and page
    return activeResource === 'starships'
      ? starships.slice(startIndex, endIndex)
      : pilots.slice(startIndex, endIndex);
  }, [activeResource, pilots, starships, page]);

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
          <Pagination count={activeResource == 'starships' ? starships.length : pilots.length} page={page} setPage={setPage} />
        </>
      }
    </div>
  );
}

export default Dashboard;
