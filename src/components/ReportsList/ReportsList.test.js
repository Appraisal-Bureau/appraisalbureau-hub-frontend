import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';

import ReportsList from './ReportsList';

jest.mock('components/DateWidget/DateWidget', () => () => (
  <div data-testid="date-widget" />
));
jest.mock('components/Table/Table', () => ({ columns, data, hideHeader }) => (
  <table data-testid="mui-table">
    <thead>
      {!hideHeader ? (
        <tr>
          {columns.map((col) => (
            <th key={col.key}>{col.header}</th>
          ))}
        </tr>
      ) : null}
    </thead>
    <tbody>
      {data.map((row, index) => (
        <tr key={index}>
          {columns.map((col) => (
            <td key={col.key}>{row[col.key]}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
));

describe('ReportsList Component', () => {
  const mockData = [
    {
      id: 1,
      date: '2023-05-20',
      pieces: [
        {
          title: 'Art Piece 1',
          artist: 'Artist 1',
          collection: 'Collection 1',
        },
        {
          title: 'Art Piece 2',
          artist: 'Artist 2',
          collection: 'Collection 2',
        },
      ],
    },
    {
      id: 2,
      date: '2023-06-15',
      pieces: [
        {
          title: 'Art Piece 3',
          artist: 'Artist 3',
          collection: 'Collection 3',
        },
      ],
    },
    {
      id: 3,
      date: '2022-07-10',
      pieces: [
        {
          title: 'Art Piece 4',
          artist: 'Artist 4',
          collection: 'Collection 4',
        },
      ],
    },
  ];

  it('renders ReportsList correctly', () => {
    render(<ReportsList data={mockData} />);

    expect(screen.getByText('2023')).toBeInTheDocument();
    expect(screen.getByText('2022')).toBeInTheDocument();

    expect(screen.getAllByTestId('date-widget')).toHaveLength(3);

    expect(screen.getAllByTestId('mui-table')).toHaveLength(3);
  });

  it('groups data by year correctly', () => {
    render(<ReportsList data={mockData} />);

    const year2023 = screen.getByText('2023').closest('.report-container');
    const year2022 = screen.getByText('2022').closest('.report-container');

    expect(year2023).toHaveTextContent('Art Piece 1');
    expect(year2023).toHaveTextContent('Art Piece 2');
    expect(year2023).toHaveTextContent('Art Piece 3');
    expect(year2022).toHaveTextContent('Art Piece 4');
  });

  it('renders See All Upcoming button', () => {
    render(<ReportsList data={mockData} />);
    const actionButton = screen.getByText('See All Upcoming');
    expect(actionButton).toBeInTheDocument();
  });
});
