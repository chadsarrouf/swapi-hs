import { Link } from "react-router-dom";

type Props = {
  header: string;
  resourceId: string;
  resource: string;
};

const Card = ({ header, resource, resourceId }: Props) => {
  const imageUrl = `/${resource}/${resourceId}.jpg`;
    // Regular expression to match the last occurrence of 's'
  const regex = /s(?!.*s)/;
  // Remove the last 's' from the string
  const resourceSingular = resource.replace(regex, '');
  // I.e. starship/4
  const resourceUrl = `${resourceSingular}/${resourceId}`;
  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.parentElement?.classList.add("hovering-card");
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.parentElement?.classList.remove("hovering-card");
  };

  return (
    <Link
      className="card" 
      to={resourceUrl}
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