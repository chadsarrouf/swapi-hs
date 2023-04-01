import Card from './Card';
import Pilot from '../types/Pilot';
import Starship from '../types/Starship';

type Props = {
  cardData: Pilot[] | Starship[];
  resource: "starships" | "pilots";
};

const CardContainer = ({cardData, resource}: Props) => {  

  // console.log(cardData);

  let cards=cardData.map((card,index)=>{
    const url = card.url;
    const regex = /\d+(?=\/$)/; // match one or more digits at the end of the string
    const match = url.match(regex); // returns an array containing the match or null
    const id = match?.[0]?.toString() ?? "";

    return <Card key={index} header={card.name} resource={resource} resourceId={id} />
  
  })

  return (
    <div className="card-container grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-16">
      {cards}
  </div>     
  );
};

export default CardContainer;