import { useState } from 'react';

import './Grid.scss';
import GridCard from './GridCard/GridCard';

function Grid({ cardData }) {
  const [selectedCards, setSelectedCards] = useState([]);
  const isSelected = (id) => {
    return selectedCards === null ? false : selectedCards.indexOf(id) !== -1;
  };

  const toggleCardSelect = (id) => {
    const selectedIndex = selectedCards.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedCards, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedCards.slice(1));
    } else if (selectedIndex === selectedCards.length - 1) {
      newSelected = newSelected.concat(selectedCards.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedCards.slice(0, selectedIndex),
        selectedCards.slice(selectedIndex + 1),
      );
    }
    setSelectedCards(newSelected);
  };

  return (
    <>
      <div className="grid">
        {cardData.map((card) => {
          return (
            <GridCard
              key={card.id}
              data={card}
              toggleCardSelect={toggleCardSelect}
              isSelected={isSelected(card.id)}
            />
          );
        })}
      </div>
    </>
  );
}

export default Grid;
