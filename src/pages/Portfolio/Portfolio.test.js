import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { getItems } from 'api/items';
import React from 'react';

import Portfolio from './Portfolio';

jest.mock('components/Table/Table', () => () => (
  <div data-testid="mui-table"></div>
));

jest.mock('api/items');

describe('Portfolio Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the Portfolio component correctly', async () => {
    render(<Portfolio />);

    expect(screen.getByText('My Portfolio')).toBeInTheDocument();

    await waitFor(() => {
      const table = screen.getAllByTestId('mui-table');
      expect(table).toHaveLength(1);
    });

    const actionBar = screen.getByTestId('action-bar');
    expect(actionBar).toBeInTheDocument();
  });
});

describe('MuiTable pagination functionality with API', () => {
  const mockData = [
    { title: 'Art Piece 1', artist: 'Artist 1', value: 1000 },
    { title: 'Art Piece 2', artist: 'Artist 2', value: 3000 },
    { title: 'Art Piece 3', artist: 'Artist 3', value: 2000 },
  ];

  const sortedAsc = [
    { title: 'Art Piece 1', artist: 'Artist 1', value: 1000 },
    { title: 'Art Piece 3', artist: 'Artist 3', value: 2000 },
    { title: 'Art Piece 2', artist: 'Artist 2', value: 3000 },
  ];

  const sortedDesc = [
    { title: 'Art Piece 2', artist: 'Artist 2', value: 3000 },
    { title: 'Art Piece 3', artist: 'Artist 3', value: 2000 },
    { title: 'Art Piece 1', artist: 'Artist 1', value: 1000 },
  ];

  const mockDataLong = Array.from({ length: 100 }, (_, index) => ({
    title: `Art Piece ${index + 1}`,
    artist: 'Artist',
    value: index * 1000,
  }));

  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState');
  beforeEach(() => {
    useStateSpy.mockImplementation((init) => [init, setState]);
  });

  it('fetches the next page when next page button is clicked', async () => {
    getItems
      .mockResolvedValueOnce({
        data: {
          items: mockDataLong.slice(0, 15),
          total: mockDataLong.length,
        },
      })
      .mockResolvedValueOnce({
        data: {
          items: mockDataLong.slice(16, 30),
          total: mockDataLong.length,
        },
      });

    render(<Portfolio />);

    // first page
    await waitFor(() => {
      expect(screen.getByText('Art Piece 1')).toBeInTheDocument();
    });
    expect(screen.queryByText('Art Piece 16')).not.toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('Go to next page'));

    // second page
    await waitFor(() => {
      expect(screen.queryByText('Art Piece 1')).not.toBeInTheDocument();
      expect(screen.getByText('Art Piece 16')).toBeInTheDocument();
    });
  });

  it('fetches the correct number of rows per page when changed via dropdown', async () => {
    getItems
      .mockResolvedValueOnce({
        data: {
          items: mockDataLong.slice(0, 15),
          total: mockDataLong.length,
        },
      })
      .mockResolvedValueOnce({
        data: {
          items: mockDataLong.slice(0, 25),
          total: mockDataLong.length,
        },
      });
    render(<Portfolio />);

    await waitFor(() => {
      const numRows = screen.getAllByRole('row').length - 1; //subtract 1 for footer
      expect(numRows).toBe(15);
    });

    fireEvent.mouseDown(screen.getByRole('combobox'));
    const options = screen.getAllByRole('option');
    const option25 = options.find(
      (option) => option.getAttribute('data-value') === '25',
    );
    fireEvent.click(option25);

    await waitFor(() => {
      const updatedNumRows = screen.getAllByRole('row').length - 1;
      expect(updatedNumRows).toBe(25);
    });
  });

  describe('MuiTable Sort Functionality', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('sorts by value in ascending and descending order', async () => {
      getItems.mockResolvedValueOnce({ data: mockData });

      render(<Portfolio />);

      const headerCell = screen.getByText('Value');

      // Initially, check if the data is in the default order (skip header)
      let rows = screen.getAllByRole('row').slice(1);
      expect(rows[0]).toHaveTextContent('$1,000');
      expect(rows[1]).toHaveTextContent('$3,000');
      expect(rows[2]).toHaveTextContent('$2,000');

      fireEvent.click(headerCell);
      getItems.mockResolvedValueOnce({ data: sortedAsc });

      await waitFor(() => {
        rows = screen.getAllByRole('row').slice(1);
        expect(rows[0]).toHaveTextContent('$1,000');
        expect(rows[1]).toHaveTextContent('$2,000');
        expect(rows[2]).toHaveTextContent('$3,000');
      });

      fireEvent.click(headerCell);
      getItems.mockResolvedValueOnce({ data: sortedDesc });

      await waitFor(() => {
        rows = screen.getAllByRole('row').slice(1);
        expect(rows[0]).toHaveTextContent('$3,000');
        expect(rows[1]).toHaveTextContent('$2,000');
        expect(rows[2]).toHaveTextContent('$1,000');
      });
    });
  });
});
