import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import MuiTable from './Table';

const mockColumns = [
  { key: 'title', header: 'Title' },
  { key: 'artist', header: 'Artist' },
  { key: 'value', header: 'Value' },
];

const mockData = [
  { title: 'Art Piece 1', artist: 'Artist 1', value: 1000 },
  { title: 'Art Piece 2', artist: 'Artist 2', value: 3000 },
  { title: 'Art Piece 3', artist: 'Artist 3', value: 2000 },
];

const init = [];
const setState = jest.fn();
const useStateSpy = jest.spyOn(React, 'useState');
beforeEach(() => {
  useStateSpy.mockImplementation((init) => [init, setState]);
});

describe('MuiTable Component', () => {
  it('renders table correctly', () => {
    render(
      <MuiTable
        columns={mockColumns}
        data={mockData}
        hideHeader={false}
        showPagination={false}
      />,
    );

    mockColumns.forEach((column) => {
      expect(screen.getByText(column.header)).toBeInTheDocument();
    });

    mockData.forEach((row) => {
      expect(screen.getByText(row.title)).toBeInTheDocument();
      expect(screen.getByText(row.artist)).toBeInTheDocument();
      expect(screen.getByText(row.value)).toBeInTheDocument();
    });
  });

  it('hides table header when hideHeader is true', () => {
    render(
      <MuiTable
        columns={mockColumns}
        data={mockData}
        hideHeader={true}
        showPagination={false}
      />,
    );

    mockColumns.forEach((column) => {
      expect(screen.queryByText(column.header)).not.toBeInTheDocument();
    });

    mockData.forEach((row) => {
      expect(screen.getByText(row.title)).toBeInTheDocument();
      expect(screen.getByText(row.artist)).toBeInTheDocument();
      expect(screen.getByText(row.value)).toBeInTheDocument();
    });
  });

  it('renders correct number of rows and columns', () => {
    render(
      <MuiTable
        columns={mockColumns}
        data={mockData}
        hideHeader={false}
        showCheckboxes={false}
        showPagination={false}
      />,
    );

    const rows = screen.getAllByRole('row');
    // 1 header row + data rows
    expect(rows).toHaveLength(mockData.length + 1);

    const cells = screen.getAllByRole('cell');
    // number of cells = number of columns * number of rows
    expect(cells).toHaveLength(mockColumns.length * mockData.length);
  });
});

describe('MuiTable checkbox functionality', () => {
  it('renders checkboxes when showCheckboxes is true', () => {
    render(
      <MuiTable
        columns={mockColumns}
        data={mockData}
        hideHeader={false}
        showCheckboxes={true}
        selectedRows={init}
        setSelectedRows={setState}
        totalRows={mockData.length}
        showPagination={false}
      />,
    );

    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes.length).toBe(mockData.length + 1);
  });

  it('selects and unselects all checkboxes when the select all checkbox is clicked', async () => {
    render(
      <MuiTable
        columns={mockColumns}
        data={mockData}
        hideHeader={false}
        showCheckboxes={true}
        selectedRows={init}
        setSelectedRows={setState}
        totalRows={mockData.length}
        showPagination={false}
      />,
    );

    await waitFor(() => {
      fireEvent.click(screen.getByLabelText('select all'));
      const checkboxes = screen.getAllByRole('checkbox');
      checkboxes.forEach((box) => {
        expect(box.checked).toEqual(true);
      });
    });

    await waitFor(() => {
      fireEvent.click(screen.getByLabelText('select all'));
      checkboxes.forEach((box) => {
        expect(box.checked).toEqual(false);
      });
    });
  });

  it('displays an indeterminate symbol when some but not all boxes are checked', () => {
    render(
      <MuiTable
        columns={mockColumns}
        data={mockData}
        hideHeader={false}
        showCheckboxes={true}
        showPagination={false}
        totalRows={mockData.length}
        selectedRows={init}
        setSelectedRows={setState}
      />,
    );
    const oneBox = screen.getByRole('checkbox', { name: 'table-checkbox-0' });
    fireEvent.click(oneBox);
    const selectAllBox = screen.getByLabelText('select all');
    expect(selectAllBox).toHaveAttribute('data-indeterminate', 'true');
  });
});
