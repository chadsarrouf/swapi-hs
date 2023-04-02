import logo from '../assets/logo.png';
import { useNavigate } from "react-router-dom";

const CardContainer = () => {  
  const navigate = useNavigate();
  
  return (
    <header className="header">
      <img  onClick={() => {navigate('/'); navigate(0)}} src={logo} className="logo"  alt="logo" />
    </header> 
  );
};

export default CardContainer;