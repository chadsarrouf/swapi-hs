import logo from '../assets/logo.png';
import refresh from '../assets/refresh.png';
import muted from '../assets/v-on.png';
import unmuted from '../assets/v-off.png';
import { useNavigate} from "react-router-dom";
import { useRef, useState  } from "react";

const CardContainer = () => {  
  const [isMuted, setIsMuted] = useState(false);

  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
    }
  }

  return (
    <header className="header">
      <audio ref={audioRef} src="/starwars.mp3" autoPlay />        
      <img  onClick={() => {navigate('/'); navigate(0)}} src={logo} className="logo"  alt="logo" />
      <div className="buttons">
        <img onClick={() => {navigate('/'); navigate(0)}} className={'refresh'} src={refresh} alt=""/>
        <img onClick={toggleMute} className={'mute'} src={isMuted ? unmuted : muted} alt=""/>        
      </div>
    </header> 
  );
};

export default CardContainer;