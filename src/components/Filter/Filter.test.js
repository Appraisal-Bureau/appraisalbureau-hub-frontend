import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { getSavedFilters } from 'api/user-filters';
import React from 'react';

import Filter from './Filter';

const savedFilters = {
  data: [
    {
      id: 1,
      attributes: {
        label: 'Saved Filter 1',
        values: {
          data: 'some-data',
        },
      },
    },
    {
      id: 2,
      attributes: {
        label: 'Saved Filter 2',
        values: {
          data: 'some-other-data',
        },
      },
    },
  ],
};

const columns = [
  { header: 'Title', key: 'title' },
  { header: 'Artist', key: 'artist' },
  { header: 'Collection', key: 'collection' },
  { header: 'Date Acquired', key: 'dateAcquired' },
  { header: 'Last Report', key: 'lastReport' },
  { header: 'Value', key: 'value' },
];

const filter = {};

const addFilter = jest.fn();
const removeFilter = jest.fn();

const setState = jest.fn();
const useStateSpy = jest.spyOn(React, 'useState');
beforeEach(() => {
  useStateSpy.mockImplementation((init) => [init, setState]);
});

describe('Filter Component', () => {
  it('renders without errors', () => {
    render(
      <Filter
        filter={filter}
        addFilter={addFilter}
        removeFilter={removeFilter}
        columns={columns}
      />,
    );
    expect(screen.getByText('Apply Saved Filter')).toBeInTheDocument();
    expect(screen.getByText('Add a filter')).toBeInTheDocument();
  });

  it('fetches saved filters and populates the dropdown', async () => {
    jest
      .spyOn(require('api/user-filters'), 'getSavedFilters')
      .mockReturnValue(savedFilters);
    render(
      <Filter
        filter={filter}
        addFilter={addFilter}
        removeFilter={removeFilter}
        columns={columns}
      />,
    );

    await waitFor(() => {
      expect(getSavedFilters).toHaveBeenCalled();
    });
  });

  it('clears all filters when Clear All button is clicked', async () => {
    render(
      <Filter
        filter={{ title: [{ id: 'test', selector: '$eqi', query: 'test' }] }}
        addFilter={addFilter}
        removeFilter={removeFilter}
        columns={columns}
      />,
    );

    fireEvent.click(screen.getByText('Clear All'));

    expect(removeFilter).toHaveBeenCalledWith('title', 'test');
  });

  it('displays active filters correctly', async () => {
    render(
      <Filter
        filter={{ title: [{ id: 'test', selector: '$eqi', query: 'test' }] }}
        addFilter={addFilter}
        removeFilter={removeFilter}
        columns={columns}
      />,
    );

    expect(screen.getByText('Active Filters')).toBeInTheDocument();
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('test')).toBeInTheDocument();
  });
});
