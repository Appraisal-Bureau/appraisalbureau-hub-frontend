import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import React, { useState } from 'react';

import './Table.scss';

function MuiTable({ columns, data, hideHeader, showCheckboxes }) {
  const [selected, setSelected] = useState([]);
  const isSelected = (id) => selected.indexOf(id) !== -1;

  const toggleRowSelect = (id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const onSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = data.map((n) => n.id);
      setSelected(newSelected);
    } else {
      setSelected([]);
    }
  };

  return (
    <div className="table">
      <Table sx={{ minWidth: 400, tableLayout: 'fixed' }}>
        {!hideHeader && (
          <TableHead>
            <TableRow className="header">
              {showCheckboxes ? (
                <TableCell className="table-cell" key="select-all-checkbox">
                  <Checkbox
                    data-testid="select-all-checkbox"
                    indeterminate={
                      selected.length > 0 && selected.length < data.length
                    }
                    checked={data.length > 0 && selected.length === data.length}
                    onChange={onSelectAllClick}
                    inputProps={{ 'aria-label': 'select all' }}
                  />
                </TableCell>
              ) : null}
              {columns.map((column) => (
                <TableCell
                  sx={{ color: 'white' }}
                  className="table-cell"
                  key={column.key}
                >
                  {column.header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
        )}
        <TableBody>
          {data.map((row, rowIndex) => {
            const isItemSelected = isSelected(row.id);
            const labelId = `table-checkbox-${rowIndex}`;
            return (
              <TableRow key={rowIndex} className="table-row">
                {showCheckboxes ? (
                  <TableCell className="table-cell first-column" key={labelId}>
                    <Checkbox
                      onClick={() => toggleRowSelect(row.id)}
                      checked={isItemSelected}
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </TableCell>
                ) : null}
                {columns.map((column) => (
                  <TableCell
                    className="table-cell"
                    key={`${rowIndex}-${column.key}`}
                  >
                    {row[column.key]}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

export default MuiTable;
