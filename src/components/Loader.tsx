import ship from '../assets/ship.png';

const Loader = ({loading}: {loading: boolean}) => {
  return (
    <img src={ship} alt="" className={`loader ${loading ? 'loading' : ''}`}/>
  );
};

export default Loader;