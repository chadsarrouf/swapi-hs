import { useSearchParams } from "react-router-dom";

type Props = {
  count: number;
  page: number;
  setPage: (page: number) => void;
};

const Pagination = ({ count, page, setPage }: Props) => {

  const [searchParams, setSearchParams] = useSearchParams();

  const currentParams = searchParams.toString(); 
  const cardsPerPage = 20;

  const numberOfPages = Math.ceil(count/cardsPerPage);

  let pages = () => {
    let content = [];
    for (let i = 1 ; i < numberOfPages + 1; i++) {
      const newSearchParams = new URLSearchParams(searchParams);
      const classes = page == i ? 'active' : '';
      newSearchParams.set("page", i.toString());
      const handleClick = () => {
        setSearchParams(newSearchParams);
        setPage(i);
      };

      content.push(<p className={classes} onClick={handleClick} key={i}>{i}</p>);
    }
    return content;
  };

  const classes  = `pagination noselect ${count == 0 ? 'empty' : ''} `

  const handleArrowClick = (value: 1 | -1) => {
    const newSearchParams = new URLSearchParams(searchParams);
    let newValue = page;
    if (page + value > 0 && page + value <= numberOfPages) {
      newValue += value;
    } 
    setPage(newValue);
    newSearchParams.set("page", newValue.toString());
    setSearchParams(newSearchParams);
    
    
  };

  return (
    <div className={classes}>
      { count > 0 &&
        <>
          <span onClick={() => handleArrowClick(-1)} className="arrow">←</span>
          { pages() }
          <span onClick={() => handleArrowClick(1)} className="arrow">→</span>
        </>
      }
    </div>
      
  );
};

export default Pagination;