import { TablePagination } from '@mui/material';
import { useState } from 'react';

import './Grid.scss';
import GridCard from './GridCard/GridCard';

function Grid({ cardData, selectedCards, setSelectedCards }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(9);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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
      <TablePagination
        component="div"
        rowsPerPageOptions={[15, 25, 50]}
        page={page}
        rowsPerPage={rowsPerPage}
        count={cardData.length}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ marginRight: '60px', marginBottom: '20px' }}
      />
    </>
  );
}

export default Grid;
