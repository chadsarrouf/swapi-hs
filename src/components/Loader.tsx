import ship from '../assets/ship.png';

const Loader = ({loading}: {loading: boolean}) => {
  return (
    <img src={ship} className={`loader ${loading ? 'loading' : ''}`}/>
  );
};

export default Loader;