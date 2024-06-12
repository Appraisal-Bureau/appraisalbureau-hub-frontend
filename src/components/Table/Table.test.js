import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { waitFor } from '@testing-library/react';
import { formatMoney } from 'helpers/portfolio.helpers';
import React from 'react';

import MuiTable from './Table';

const mockColumns = [
  { key: 'title', header: 'Title' },
  { key: 'artist', header: 'Artist' },
  { key: 'value', header: 'Value' },
];

const mockColumnsWithFormatAndSort = [
  { key: 'title', header: 'Title' },
  { key: 'artist', header: 'Artist' },
  { key: 'value', header: 'Value', enableSort: true, formatFn: formatMoney },
];

const mockData = [
  { title: 'Art Piece 1', artist: 'Artist 1', value: 1000 },
  { title: 'Art Piece 2', artist: 'Artist 2', value: 3000 },
  { title: 'Art Piece 3', artist: 'Artist 3', value: 2000 },
];

const mockDataLong = Array.from({ length: 100 }, (_, index) => ({
  title: `Art Piece ${index + 1}`,
  artist: 'Artist',
  value: index * 1000,
}));

describe('MuiTable Component', () => {
  let useStateMock;

  beforeEach(() => {
    useStateMock = jest.spyOn(React, 'useState');
    useStateMock.mockImplementation((init) => [init, jest.fn()]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

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
    const [selectedRows, setSelectedRows] = useState([]);
    render(
      <MuiTable
        columns={mockColumns}
        data={mockData}
        hideHeader={false}
        showCheckboxes={true}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        showPagination={false}
      />,
    );

    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes.length).toBe(mockData.length + 1);
  });

  it('selects and unselects all checkboxes when the select all checkbox is clicked', () => {
    const [selectedRows, setSelectedRows] = useState([]);
    render(
      <MuiTable
        columns={mockColumns}
        data={mockData}
        hideHeader={false}
        showCheckboxes={true}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        showPagination={false}
      />,
    );

    fireEvent.click(screen.getByLabelText('select all'));

    const checkboxes = screen.getAllByRole('checkbox');
    checkboxes.forEach((box) => {
      expect(box.checked).toEqual(true);
    });

    fireEvent.click(screen.getByLabelText('select all'));
    checkboxes.forEach((box) => {
      expect(box.checked).toEqual(false);
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
      />,
    );
    const oneBox = screen.getByRole('checkbox', { name: 'table-checkbox-0' });
    fireEvent.click(oneBox);
    const selectAllBox = screen.getByLabelText('select all');
    expect(selectAllBox).toHaveAttribute('data-indeterminate', 'true');
  });
});

describe('MuiTable pagination functionality', () => {
  it('changes page when next page button is clicked', () => {
    render(
      <MuiTable
        columns={mockColumns}
        data={mockDataLong}
        hideHeader={false}
        showCheckboxes={false}
        showPagination={true}
        rowsPerPage={15}
        page={0}
        totalRows={mockDataLong.length}
      />,
    );

    // first page
    expect(screen.getByText('Art Piece 1')).toBeInTheDocument();
    expect(screen.queryByText('Art Piece 16')).not.toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('Go to next page'));

    // second page
    expect(screen.queryByText('Art Piece 1')).not.toBeInTheDocument();
    expect(screen.getByText('Art Piece 16')).toBeInTheDocument();
  });

  it('changes the number of rows displays per page with dropdown', async () => {
    render(
      <MuiTable
        columns={mockColumns}
        data={mockDataLong}
        hideHeader={true}
        showCheckboxes={false}
        showPagination={true}
        enableSort={false}
        rowsPerPage={15}
        page={0}
        totalRows={mockDataLong.length}
      />,
    );

    const numRows = screen.getAllByRole('row').length - 1; //subtract 1 for footer
    expect(numRows).toBe(15);

    fireEvent.mouseDown(screen.getByRole('combobox'));
    const options = screen.getAllByRole('option');
    const option20 = options.find(
      (option) => option.getAttribute('data-value') === '25',
    );
    fireEvent.click(option20);
    await waitFor(() => {
      const updatedNumRows = screen.getAllByRole('row').length - 1;
      expect(updatedNumRows).toBe(25);
    });
  });

  describe('MuiTable Sort Functionality', () => {
    it('sorts by value in ascending and descending order', () => {
      const [order, setOrder] = useState('asc');
      const [orderBy, setOrderBy] = useState(null);

      render(
        <MuiTable
          columns={mockColumnsWithFormatAndSort}
          data={mockData}
          hideHeader={false}
          showCheckboxes={false}
          showPagination={false}
          order={order}
          setOrder={setOrder}
          orderBy={orderBy}
          setOrderBy={setOrderBy}
        />,
      );

      const headerCell = screen.getByText('Value');

      // Initially, check if the data is in the default order (skip header)
      let rows = screen.getAllByRole('row').slice(1);
      expect(rows[0]).toHaveTextContent('$1,000');
      expect(rows[1]).toHaveTextContent('$3,000');
      expect(rows[2]).toHaveTextContent('$2,00');

      fireEvent.click(headerCell);

      rows = screen.getAllByRole('row').slice(1);
      expect(rows[0]).toHaveTextContent('$1,00');
      expect(rows[1]).toHaveTextContent('$2,000');
      expect(rows[2]).toHaveTextContent('$3,000');

      fireEvent.click(headerCell);

      rows = screen.getAllByRole('row').slice(1);
      expect(rows[0]).toHaveTextContent('$3,000');
      expect(rows[1]).toHaveTextContent('$2,000');
      expect(rows[2]).toHaveTextContent('$1,000');
    });
  });
});
