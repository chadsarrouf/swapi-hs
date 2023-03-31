import Card from './Card';
import Pilot from '../types/Pilot';
import Starship from '../types/Starship';

type Props = {
  cardData: Pilot[] | Starship[];
};

const CardContainer = ({cardData}: Props) => {  
  return (
    <div className="card-container grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-16">
      <Card header="Luke Skywalker the third" imageUrl="https://static.wikia.nocookie.net/ppc/images/b/bb/Luke_Skywalker.jpg"></Card>
      <Card header="Senetaor Palapatine" imageUrl="https://images.unsplash.com/photo-1557177324-56c542165309?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"></Card>
      <Card header="gooo" imageUrl="https://images.unsplash.com/photo-1557177324-56c542165309?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"></Card>
      <Card header="gooo" imageUrl="https://images.unsplash.com/photo-1557177324-56c542165309?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"></Card>
      <Card header="gooo" imageUrl="https://images.unsplash.com/photo-1557177324-56c542165309?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"></Card>

  </div>     
  );
};

export default CardContainer;