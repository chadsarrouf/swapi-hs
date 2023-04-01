import React, { useState, useContext, useEffect, useMemo } from 'react';
import { useParams } from "react-router-dom";
import '../App.scss';
import { DataContext } from '../contexts/DataContext';
import { useFetchResource } from '../hooks/SwapiApi';
import logo from '../assets/logo.png';
import ship from '../assets/ship.png';
import Card from './Card';
import CardContainer from './CardContainer';
import Header from './Header';
import StarshipType from '../types/Starship';

const Starship = () => {
  const { starships } = useContext(DataContext);
  let { starshipId } = useParams();

  
  const { resource: starship, loading, error } = useFetchResource("starships", starshipId ?? "1");



  return (
    <div className="starships flex ">
      <img src={"../assets/ship.png"} className="ship"  alt="loader" />
      <div className="details">
        {starship?.name}
      </div>
    </div>
  );
}

export default Starship;
