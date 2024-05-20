import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';

import MuiTable from './Table';

describe('MuiTable Component', () => {
  const mockColumns = [
    { key: 'title', header: 'Title' },
    { key: 'artist', header: 'Artist' },
    { key: 'value', header: 'Value' },
  ];

  const mockData = [
    { title: 'Art Piece 1', artist: 'Artist 1', value: 1000 },
    { title: 'Art Piece 2', artist: 'Artist 2', value: 2000 },
  ];

  it('renders table correctly', () => {
    render(
      <MuiTable columns={mockColumns} data={mockData} hideHeader={false} />,
    );

    mockColumns.forEach((column) => {
      expect(screen.getByText(column.header)).toBeInTheDocument();
    });

    mockData.forEach((row) => {
      expect(screen.getByText(row.title)).toBeInTheDocument();
      expect(screen.getByText(row.artist)).toBeInTheDocument();
      expect(
        screen.getByText(`$${row.value.toLocaleString()}`),
      ).toBeInTheDocument();
    });
  });

  it('hides table header when hideHeader is true', () => {
    render(
      <MuiTable columns={mockColumns} data={mockData} hideHeader={true} />,
    );

    mockColumns.forEach((column) => {
      expect(screen.queryByText(column.header)).not.toBeInTheDocument();
    });

    mockData.forEach((row) => {
      expect(screen.getByText(row.title)).toBeInTheDocument();
      expect(screen.getByText(row.artist)).toBeInTheDocument();
      expect(
        screen.getByText(`$${row.value.toLocaleString()}`),
      ).toBeInTheDocument();
    });
  });

  it('renders correct number of rows and columns', () => {
    render(
      <MuiTable columns={mockColumns} data={mockData} hideHeader={false} />,
    );

    const rows = screen.getAllByRole('row');
    // 1 header row + data rows
    expect(rows).toHaveLength(mockData.length + 1);

    const cells = screen.getAllByRole('cell');
    // number of cells = number of columns * number of data rows
    expect(cells).toHaveLength(mockColumns.length * mockData.length);
  });

  it('formats value cells correctly', () => {
    render(
      <MuiTable columns={mockColumns} data={mockData} hideHeader={false} />,
    );

    mockData.forEach((row) => {
      expect(
        screen.getByText(`$${row.value.toLocaleString()}`),
      ).toBeInTheDocument();
    });
  });
});
