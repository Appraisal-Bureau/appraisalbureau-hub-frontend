import "../styles/Table.scss";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

function MuiTable({ columns, data, hideHeader }) {
  return (
    <div className="table">
      <Table sx={{ minWidth: 400, tableLayout: "fixed" }}>
        {!hideHeader && (
          <TableHead>
            <TableRow className="header">
              {columns.map((column) => (
                <TableCell
                  sx={{ color: "white" }}
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
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex} className="table-row">
              {columns.map((column) => (
                <TableCell
                  className="table-cell"
                  key={`${rowIndex}-${column.key}`}
                >
                  {column.key === "value"
                    ? `$${row[column.key].toLocaleString()}`
                    : row[column.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default MuiTable;
