import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import Sort from 'assets/icons/Sort.svg';
import SortAscending from 'assets/icons/SortAscending.svg';
import SortDescending from 'assets/icons/SortDescending.svg';
import React from 'react';
import { ReactSVG } from 'react-svg';

import './Table.scss';

function MuiTable({
  columns,
  data,
  hideHeader,
  showCheckboxes,
  showPagination,
  totalRows,
  selectedRows,
  setSelectedRows,
  order,
  setOrder,
  orderBy,
  setOrderBy,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
}) {
  const isSelected = (id) => {
    console.log(selectedRows);
    return selectedRows === null ? false : selectedRows.indexOf(id) !== -1;
  };

  const handleRequestSort = (event, property) => {
    if (orderBy === property) {
      if (order === 'asc') {
        setOrder('desc');
      } else if (order === 'desc') {
        setOrderBy(null);
        setOrder('asc');
      }
    } else {
      setOrderBy(property);
      setOrder('asc');
    }
  };

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

  const toggleRowSelect = (id) => {
    const selectedIndex = selectedRows.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedRows, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedRows.slice(1));
    } else if (selectedIndex === selectedRows.length - 1) {
      newSelected = newSelected.concat(selectedRows.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedRows.slice(0, selectedIndex),
        selectedRows.slice(selectedIndex + 1),
      );
    }
    setSelectedRows(newSelected);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const onSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = data.map((n) => n.id);
      setSelectedRows(newSelected);
    } else {
      setSelectedRows([]);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="table">
      <Table
        sx={{
          minWidth: 600,
          tableLayout: 'fixed',
        }}
      >
        {!hideHeader && (
          <TableHead>
            <TableRow className="header">
              {showCheckboxes && (
                <TableCell className="table-cell" padding="checkbox">
                  <Checkbox
                    indeterminate={
                      selectedRows.length > 0 &&
                      selectedRows.length < data.length
                    }
                    checked={
                      data.length > 0 && selectedRows.length === data.length
                    }
                    onClick={onSelectAllClick}
                    inputProps={{ 'aria-label': 'select all' }}
                  />
                </TableCell>
              )}
              {columns.map((column) => (
                <TableCell
                  sx={{ color: 'white' }}
                  className="table-cell"
                  key={column.key}
                  sortDirection={
                    column.enableSort &&
                    (orderBy === column.key ? order : false)
                  }
                  onClick={
                    column.enableSort ? createSortHandler(column.key) : null
                  }
                >
                  {column.header}
                  {column.enableSort && orderBy === column.key ? (
                    <ReactSVG
                      className="icon"
                      src={order === 'desc' ? SortDescending : SortAscending}
                    />
                  ) : column.enableSort ? (
                    <ReactSVG className="icon" src={Sort} />
                  ) : null}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
        )}
        <TableBody>
          {data.map((row, rowIndex) => {
            const columnsContent = columns.map((column) => (
              <TableCell
                className="table-cell"
                key={`${rowIndex}-${column.key}`}
                padding={column.key === 'color' ? 'checkbox' : 'normal'}
              >
                {column.formatFn
                  ? column.formatFn(row[column.key])
                  : row[column.key]}
              </TableCell>
            ));
            return (
              <TableRow key={rowIndex} className="table-row">
                {showCheckboxes && (
                  <TableCell
                    className="table-cell first-column"
                    key={`table-checkbox-${rowIndex}`}
                  >
                    <Checkbox
                      onClick={() => toggleRowSelect(row.id)}
                      checked={isSelected(row.id)}
                      inputProps={{
                        'aria-label': `table-checkbox-${rowIndex}`,
                      }}
                    />
                  </TableCell>
                )}
                {columnsContent}
              </TableRow>
            );
          })}
          {emptyRows > 0 && (
            <TableRow
              style={{
                height: 43 * emptyRows,
              }}
            >
              <TableCell colSpan={columns.length + 1} />
            </TableRow>
          )}
        </TableBody>
        {showPagination && (
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[15, 25, 50]}
                page={page}
                colSpan={columns.length + 1}
                rowsPerPage={rowsPerPage}
                count={totalRows}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </div>
  );
}

export default MuiTable;
