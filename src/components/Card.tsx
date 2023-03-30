type Props = {
  header: string;
  imageUrl: string;
};

const Card = ({ header, imageUrl }: Props) => {
  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.parentElement?.classList.add("hovering-card");
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.parentElement?.classList.remove("hovering-card");
  };

  return (
    <a 
      className="card" 
      href="#"
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
    </a>
  );
};

export default Card;