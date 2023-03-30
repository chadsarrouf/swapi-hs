import React, { useContext, useEffect } from 'react';
import './App.scss';
import { DataContext } from './contexts/DataContext';
import useFetchSwapiData from './hooks/SwapiApi';
import logo from './assets/logo.png';
import ship from './assets/ship.png';
import Card from './components/Card';



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
      </header>

      

      <section className="content">

        <div className="tab-container flex flex-row justify-evenly flex-wrap">
          <h1 className="starships"> Starships </h1> 

          <h1 className="pilots"> Pilots </h1> 
        </div>

        <div className="card-container grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-16">

          <Card header="Luke Skywalker the third" imageUrl="https://static.wikia.nocookie.net/ppc/images/b/bb/Luke_Skywalker.jpg"></Card>
          <Card header="Senetaor Palapatine" imageUrl="https://images.unsplash.com/photo-1557177324-56c542165309?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"></Card>
          <Card header="gooo" imageUrl="https://images.unsplash.com/photo-1557177324-56c542165309?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"></Card>
          <Card header="gooo" imageUrl="https://images.unsplash.com/photo-1557177324-56c542165309?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"></Card>
          <Card header="gooo" imageUrl="https://images.unsplash.com/photo-1557177324-56c542165309?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"></Card>

        </div>        
      </section>

      {/* <div className="grid grid-cols-4 gap-20">
        <div className="example-2 card">
          <div className="wrapper">
            <div className="header">
              <div className="date">
                <span className="day">12</span>
                <span className="month">Aug</span>
                <span className="year">2016</span>
              </div>
              <ul className="menu-content">
                <li>
                  <a href="#" className="fa fa-bookmark-o"></a>
                </li>
                <li><a href="#" className="fa fa-heart-o"><span>18</span></a></li>
                <li><a href="#" className="fa fa-comment-o"><span>3</span></a></li>
              </ul>
            </div>
            <div className="data">
              <div className="content">
                <span className="author">Jane Doe</span>
                <h1 className="title"><a href="#">Stranger Things: The sound of the Upside Down</a></h1>
                <p className="text">The antsy bingers of Netflix will eagerly anticipate the digital release of the Survive soundtrack, out today.</p>
                <a href="#" className="button">Read more</a>
              </div>
            </div>
          </div>
        </div>
        <div>01</div>
        <div>09</div>
        <div>09</div>
        <div>09</div>
        <div>09</div>
      </div>    */}
    </div>
  );
}

export default App;
