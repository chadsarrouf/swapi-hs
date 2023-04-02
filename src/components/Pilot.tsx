import React, { useState, useContext, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import '../App.scss';
import { DataContext } from '../contexts/DataContext';
import { useFetchResource } from '../hooks/SwapiApi';
import back from '../assets/back.png';
import PilotType from '../types/Pilot';
import Loader from './Loader';

type Props = {
  pilotsInMemory: boolean;
};

const Pilot = ( { pilotsInMemory } : Props)  => {
  let { pilotId } = useParams();
  const [pilot, setPilot] = useState<PilotType>();
  const imageUrl = `/pilots/${pilotId}.jpg`;
  const { resource, loading: resourceLoading } = useFetchResource("pilots", pilotId ?? "0", !!pilotsInMemory);
  
  const { starships, pilots, loading} = useContext(DataContext);

  useEffect(() => {
    const pilot = pilots.find(pilot => {
      const regex = /\d+(?=\/$)/; // match one or more digits at the end of the string (the id)
      const match =  pilot.url.match(regex); // returns an array containing the match or null
      const id = match?.[0]?.toString();
      
      return id == pilotId;
    })
    setPilot(pilot);
  }, [pilots]);

  
  useEffect(() => {
    if(!pilotsInMemory) {
      setPilot(resource as PilotType);
    }
  }, [resource]);

  return (
    <div className="pilot flex ">
      <Loader loading={loading}/>
      <Link to={-1 as any}>
        <img src={back} className='back'  alt="back" />
      </Link>

      { (pilot?.name && !loading) ? 
        <div className="details">
          <img src={imageUrl} className="image"  alt="portrait" />
          <div className="info"> 
            <div>
              <span><label>Name </label></span> <p> {pilot.name} </p>
            </div>
            <div>
              <span><label>Height </label></span> <p> {pilot.height} </p>
            </div>
            <div>
              <span><label>Mass </label></span> <p> {pilot.mass} </p>
            </div>
            <div>
              <span><label>Hair Color </label></span> <p> {pilot.hair_color} </p>
            </div>
            <div>
              <span><label>Skin Color </label></span> <p> {pilot.skin_color} </p>
            </div>
            <div>
              <span><label>Birth Year </label></span> <p> {pilot.birth_year} </p>
            </div>
            <div>
              <span><label>Gender </label></span> <p> {pilot.gender} </p>
            </div>
            
            <div> 
              <span><label>Starships </label></span> 
              <p>
                { (pilot.starships.length && starships.length) ?
                    pilot.starships.map((starshipUrl, index)=>{
                      const regex = /\d+(?=\/$)/; // match one or more digits at the end of the string (the id)
                      const match =  starshipUrl.match(regex); // returns an array containing the match or null
                      const id = match?.[0]?.toString();
                      
                      const starshipName = starships.filter(starship => {
                        return starship.url == starshipUrl;
                      })[0]?.name;

                      return (
                        <li key={index}>
                          <Link
                            className="card" 
                            to={`/starship/${id}`}
                          >
                          {`${starshipName} →`}
                          </Link>
                        </li>
                      );

                      })
                      :
                      "n/a"                    
                }                 
              </p>
            </div>
          </div>
        </div>           :
        (!loading && !resourceLoading &&
        <div className="error">
          No data found for Pilot #{pilotId}.
        </div>)     
      }
    </div>
  );
}

export default Pilot;
