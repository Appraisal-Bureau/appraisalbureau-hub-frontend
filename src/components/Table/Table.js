import {
  Box,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import React, { useMemo, useState } from 'react';

import './Table.scss';

function MuiTable({
  columns,
  data,
  hideHeader,
  showCheckboxes,
  showPagination,
  enableSort,
}) {
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState(columns[0]);
  const isSelected = (id) => selected.indexOf(id) !== -1;

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  const getComparator = (order, orderBy) => {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = useMemo(
    () =>
      data
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .sort(getComparator(order, orderBy)),
    [data, page, rowsPerPage, order, orderBy],
  );

  return (
    <div className="table">
      <Table sx={{ minWidth: 400, tableLayout: 'fixed' }}>
        {!hideHeader && (
          <TableHead>
            <TableRow className="header">
              {showCheckboxes ? (
                <TableCell className="table-cell">
                  <Checkbox
                    indeterminate={
                      selected.length > 0 && selected.length < data.length
                    }
                    checked={data.length > 0 && selected.length === data.length}
                    onClick={onSelectAllClick}
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
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={orderBy === column.id ? order : 'asc'}
                    onClick={enableSort ? handleRequestSort(column.id) : null}
                  >
                    {column.header}
                    {orderBy === column.id ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === 'desc'
                          ? 'sorted descending'
                          : 'sorted ascending'}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
        )}
        <TableBody>
          {visibleRows.map((row, rowIndex) => {
            const isItemSelected = isSelected(row.id);
            const labelId = `table-checkbox-${rowIndex}`;
            return (
              <TableRow key={rowIndex} className="table-row">
                {showCheckboxes ? (
                  <TableCell className="table-cell first-column" key={labelId}>
                    <Checkbox
                      onClick={() => toggleRowSelect(row.id)}
                      checked={isItemSelected}
                      inputProps={{ 'aria-label': labelId }}
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
        {showPagination && (
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 15, 20]}
                page={page}
                colSpan={columns.length + 1}
                rowsPerPage={rowsPerPage}
                count={data.length}
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
