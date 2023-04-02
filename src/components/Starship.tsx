import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate, Link} from "react-router-dom";
import '../App.scss';
import { DataContext } from '../contexts/DataContext';
import { useFetchResource } from '../hooks/SwapiApi';
import back from '../assets/back.png';
import StarshipType from '../types/Starship';
import Loader from './Loader';

const Starship = () => {
  let { starshipId } = useParams();
  const [starship, setStarship] = useState<StarshipType>();
  const imageUrl = `/starships/${starshipId}.jpg`;
  const navigate = useNavigate();
  const { resource, loading, error } = useFetchResource("starships", starshipId ?? "0");
  
  useEffect(() => {
    setStarship(resource as StarshipType);
  }, [resource]);

  return (
    <div className="starship flex ">
      <Loader loading={loading}/>
      <img onClick={() => {navigate(-1);}}  src={back} className='back'  alt="back" />
      { (starship?.name && !loading) ? 
        <div className="details">
          <img src={imageUrl} className="image"  alt="portrait" />
          <div className="info"> 
            <div>
              <span><label>Name </label></span> <p> {starship.name} </p>
            </div>
            <div>
              <span><label>Model </label></span> <p> {starship.model} </p>
            </div>
            <div>
              <span><label>Manufacturer </label></span> <p> {starship.manufacturer} </p>
            </div>
            <div>
              <span><label>Cost in Credit </label></span> <p> {starship.cost_in_credits} </p>
            </div>
            <div>
              <span><label>Length </label></span> <p> {starship.length} </p>
            </div>
            <div>
              <span><label>Max Atmosphering Speed </label></span> <p> {starship.max_atmosphering_speed} </p>
            </div>
            <div>
              <span><label>Crew </label></span> <p> {starship.crew} </p>
            </div>
            <div>
              <span><label>Passengers </label></span> <p> {starship.passengers} </p>
            </div>
            <div>
              <span><label>Cargo Capacity </label></span> <p> {starship.cargo_capacity} </p>
            </div>
            <div>
              <span><label>Consumables </label></span> <p> {starship.consumables} </p>
            </div>
            <div>
              <span><label>Hyperdrive Rating </label></span> <p> {starship.hyperdrive_rating} </p>
            </div>
            <div>
              <span><label>MGLT </label></span> <p> {starship.MGLT} </p>
            </div>
            <div>
              <span><label>StarshipClass </label></span> <p> {starship.starship_class} </p>
            </div>
            <div> 
              <span><label>Pilots </label></span> 
              <p>
                { starship.pilots &&
                  starship.pilots.map((pilot, index)=>{
                    const regex = /\d+(?=\/$)/; // match one or more digits at the end of the string
                    const match =  pilot.match(regex); // returns an array containing the match or null
                    const id = match?.[0]?.toString();

                    return (
                      <li key={index}>
                        <Link
                          className="card" 
                          to={`/pilot/${id}`}
                        >
                        {`Pilot/${id} →`}
                        </Link>
                      </li>
                    );

                    })
                }        
                { !starship.pilots.length &&
                  "n/a"
                }             
              </p>
            </div>
          </div>
        </div>   
        :
         (!loading &&
          <div className="error">
            No data found for Starship #{starshipId}.
         </div>)     
      }
    </div>
  );
}

export default Starship;
