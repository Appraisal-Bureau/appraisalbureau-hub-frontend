import './Grid.scss';
import GridCard from './GridCard/GridCard';

function Grid({ cardData }) {
  const populateCards = () => {
    cardData.forEach((card) => {
      return <GridCard data={card.data} />;
    });
  };
  return <div className="grid">{populateCards()}</div>;
}

export default Grid;
