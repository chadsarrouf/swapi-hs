import { Link } from "react-router-dom";

type Props = {
  header: string;
  resourceId: string;
  resource: string;
};

const Card = ({ header, resource, resourceId }: Props) => {
  const imageUrl = `/${resource}/${resourceId}.jpg`;
  
  console.log(imageUrl, 'imageUrl');
  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.parentElement?.classList.add("hovering-card");
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.parentElement?.classList.remove("hovering-card");
  };

  return (
    <Link
      className="card" 
      to={`${resource}/${resourceId}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      >
      <div className="card-background"
        style={{
          backgroundImage: `url(${imageUrl})`
        }}>
      </div>
      <div className="card-content">
        <p className="see-details"> see details → </p>
        <h3 className="card-heading">{header}</h3>
      </div>
    </Link>
  );
};

export default Card;