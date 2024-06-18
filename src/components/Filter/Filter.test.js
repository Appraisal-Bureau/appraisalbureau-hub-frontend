import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { getSavedFilters } from 'api/user-filters';
import React from 'react';
import { act } from 'react-dom/test-utils';

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

jest.mock('api/user-filters');
getSavedFilters.mockResolvedValue({ data: { data: [] } });

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
    getSavedFilters.mockResolvedValue({ data: savedFilters });
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

    const dropdown = screen.getByRole('combobox', {
      name: 'Apply Saved Filter',
    });
    fireEvent.mouseDown(dropdown);
    await waitFor(() => {
      expect(screen.getByText('Saved Filter 1')).toBeInTheDocument();
    });
  });

  it('updates dynamic filter options based on add filter type', async () => {
    getSavedFilters.mockResolvedValue({ data: { data: [] } });
    render(
      <Filter
        filter={filter}
        addFilter={addFilter}
        removeFilter={removeFilter}
        columns={columns}
      />,
    );

    const addFilterTypeDropdown = await screen.findByTestId('add-filter-type');
    fireEvent.click(addFilterTypeDropdown);
    fireEvent.click(screen.getByText('Title'));

    const dynamicFilterDropdown = await screen.findByTestId('dynamic-filter');
    fireEvent.click(dynamicFilterDropdown);
    expect(screen.getByText('Multi-Select')).toBeInTheDocument();

    fireEvent.mouseDown(addFilterTypeDropdown);
    fireEvent.click(screen.getByText('Date Acquired'));

    fireEvent.mouseDown(dynamicFilterDropdown);
    expect(screen.getByText('Exactly')).toBeInTheDocument();
    expect(screen.getByText('Between')).toBeInTheDocument();
  });

  it('handles search query input change', async () => {
    render(
      <Filter
        filter={filter}
        addFilter={addFilter}
        removeFilter={removeFilter}
        columns={columns}
      />,
    );

    const addFilterTypeDropdown = screen.getByTestId('add-filter-type');
    fireEvent.mouseDown(addFilterTypeDropdown);
    fireEvent.click(screen.getByText('Title'));

    const searchInput = screen.getByLabelText('Search');
    fireEvent.change(searchInput, { target: { value: 'test' } });

    expect(searchInput.value).toBe('test');
  });

  it('adds a filter when Add button is clicked', async () => {
    render(
      <Filter
        filter={filter}
        addFilter={addFilter}
        removeFilter={removeFilter}
        columns={columns}
      />,
    );

    const addFilterTypeDropdown = screen.getByTestId('add-filter-type');
    fireEvent.mouseDown(addFilterTypeDropdown);
    fireEvent.click(screen.getByText('Title'));

    const dynamicFilterDropdown = screen.getByTestId('dynamic-filter');
    fireEvent.mouseDown(dynamicFilterDropdown);
    fireEvent.click(screen.getByText('Multi-Select'));

    const searchInput = screen.getByLabelText('Search');
    fireEvent.change(searchInput, { target: { value: 'test' } });

    fireEvent.click(screen.getByText('Add'));

    expect(addFilter).toHaveBeenCalledWith('title', {
      id: 'test',
      selector: '$eqi',
      query: 'test',
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
