import { useState, useContext, useEffect } from 'react';
import { useParams, Link} from "react-router-dom";
import '../App.scss';
import { DataContext } from '../contexts/DataContext';
import { useFetchResource } from '../hooks/SwapiApi';
import back from '../assets/back.png';
import StarshipType from '../types/Starship';
import Loader from './Loader';

type Props = {
  starshipsInMemory: boolean;
};

const Starship = ({starshipsInMemory} : Props) => {
  let { starshipId } = useParams(); 
  const [starship, setStarship] = useState<StarshipType>();
  const imageUrl = `/starships/${starshipId}.jpg`;
  const { resource, loading: resourceLoading} = useFetchResource("starships", starshipId ?? "0", starshipsInMemory);
  
  const { starships, pilots, loading} = useContext(DataContext);
  
  useEffect(() => {
    const starship = starships.find(starship => {
      const regex = /\d+(?=\/$)/; // match one or more digits at the end of the string (the id)
      const match =  starship.url.match(regex); // returns an array containing the match or null
      const id = match?.[0]?.toString();
      
      return id === starshipId;
    })
    setStarship(starship);
  }, [ starshipId, starships]);

  

  useEffect(() => {
    if(!starshipsInMemory) {
      setStarship(resource as StarshipType);
    }
  }, [resource, starshipsInMemory]);



  return (
    <div className="starship flex ">
      <Loader loading={loading}/>
      <Link to={-1 as any}>
        <img src={back} className='back'  alt="back" />
      </Link>
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
                { (starship.pilots.length && pilots.length) ?
                  starship.pilots.map((pilotUrl, index)=>{
                    const regex = /\d+(?=\/$)/; // match one or more digits at the end of the string (the id)
                    const match =  pilotUrl.match(regex); // returns an array containing the match or null
                    const id = match?.[0]?.toString();
                    
                    const pilotName = pilots.filter(pilot => {
                      return pilot.url === pilotUrl;
                    })[0]?.name;


                    console.log(pilotName);
                    
                    return (
                      <li key={index}>
                        <Link
                          className="card" 
                          to={`/pilot/${id}`}
                        >
                        {`${pilotName} →`}
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
        </div>   
        :
         (!loading && !resourceLoading &&
          <div className="error">
            No data found for Starship #{starshipId}.
         </div>)     
      }
    </div>
  );
}

export default Starship;
