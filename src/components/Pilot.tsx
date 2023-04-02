import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate, Link } from "react-router-dom";
import '../App.scss';
import { DataContext } from '../contexts/DataContext';
import { useFetchResource } from '../hooks/SwapiApi';
import back from '../assets/back.png';
import PilotType from '../types/Pilot';
import Loader from './Loader';

const Pilot = () => {
  let { pilotId } = useParams();
  const [pilot, setPilot] = useState<PilotType>();
  const imageUrl = `/pilots/${pilotId}.jpg`;
  const navigate = useNavigate();
  const { resource, loading, error } = useFetchResource("pilots", pilotId ?? "0");
  
  useEffect(() => {
    setPilot(resource as PilotType);
  }, [resource]);

  return (
    <div className="pilot flex ">
      <Loader loading={loading}/>
      <img onClick={() => {navigate(-1);}}  src={back} className='back'  alt="back" />
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
                { pilot.starships &&
                  pilot.starships.map((starship, index)=>{
                    const regex = /\d+(?=\/$)/; // match one or more digits at the end of the string
                    const match =  starship.match(regex); // returns an array containing the match or null
                    const id = match?.[0]?.toString();

                    return (
                      <li key={index}>
                        <Link
                          className="card" 
                          to={`/starship/${id}`}
                        >
                        {`Starship/${id} →`}
                        </Link>
                      </li>
                    );

                    })
                }        
                { !pilot.starships.length &&
                  "n/a"
                }             
              </p>
            </div>
          </div>
        </div>   
        :
         (!loading &&
          <div className="error">
            No data found for Pilot #{pilotId}.
         </div>)     
      }
    </div>
  );
}

export default Pilot;
