import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { savedFilters } from 'api/api.js';
import React from 'react';
import apiClient from 'services/apiService';

import Filter from './Filter';

// Mock the API client
jest.mock('services/apiService');
jest.mock('api/api.js', () => ({
  savedFilters: [{ id: 1, label: 'Saved Filter 1', value: 'filter1' }],
}));

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

describe('Filter Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders without errors', () => {
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

  test('fetches saved filters and populates the dropdown', async () => {
    apiClient.get.mockResolvedValueOnce({ data: savedFilters });

    render(
      <Filter
        filter={filter}
        addFilter={addFilter}
        removeFilter={removeFilter}
        columns={columns}
      />,
    );

    await waitFor(() =>
      expect(apiClient.get).toHaveBeenCalledWith('/user-filters'),
    );

    const dropdown = screen.getByLabelText('saved-filter');
    fireEvent.mouseDown(dropdown);
    expect(screen.getByText('Saved Filter 1')).toBeInTheDocument();
  });

  test('populates add filter type options', async () => {
    render(
      <Filter
        filter={filter}
        addFilter={addFilter}
        removeFilter={removeFilter}
        columns={columns}
      />,
    );

    const addFilterTypeDropdown = screen.getByLabelText('add-filter-type');
    fireEvent.mouseDown(addFilterTypeDropdown);

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Artist')).toBeInTheDocument();
    expect(screen.getByText('Collection')).toBeInTheDocument();
    expect(screen.getByText('Date Acquired')).toBeInTheDocument();
    expect(screen.getByText('Last Report')).toBeInTheDocument();
    expect(screen.getByText('Value')).toBeInTheDocument();
  });

  test('updates dynamic filter options based on add filter type', async () => {
    render(
      <Filter
        filter={filter}
        addFilter={addFilter}
        removeFilter={removeFilter}
        columns={columns}
      />,
    );

    const addFilterTypeDropdown = screen.getByLabelText('add-filter-type');
    fireEvent.mouseDown(addFilterTypeDropdown);
    fireEvent.click(screen.getByText('Title'));

    await waitFor(() => {
      const dynamicFilterDropdown = screen.getByLabelText('dynamic-filter');
      fireEvent.mouseDown(dynamicFilterDropdown);
      expect(screen.getByText('Multi-Select')).toBeInTheDocument();
    });

    fireEvent.mouseDown(addFilterTypeDropdown);
    fireEvent.click(screen.getByText('Date Acquired'));

    await waitFor(() => {
      const dynamicFilterDropdown = screen.getByLabelText('dynamic-filter');
      fireEvent.mouseDown(dynamicFilterDropdown);
      expect(screen.getByText('Exactly')).toBeInTheDocument();
      expect(screen.getByText('Between')).toBeInTheDocument();
    });
  });

  test('handles search query input change', async () => {
    render(
      <Filter
        filter={filter}
        addFilter={addFilter}
        removeFilter={removeFilter}
        columns={columns}
      />,
    );

    const addFilterTypeDropdown = screen.getByLabelText('add-filter-type');
    fireEvent.mouseDown(addFilterTypeDropdown);
    fireEvent.click(screen.getByText('Title'));

    const searchInput = screen.getByLabelText('Search');
    fireEvent.change(searchInput, { target: { value: 'test' } });

    expect(searchInput.value).toBe('test');
  });

  test('adds a filter when Add button is clicked', async () => {
    render(
      <Filter
        filter={filter}
        addFilter={addFilter}
        removeFilter={removeFilter}
        columns={columns}
      />,
    );

    const addFilterTypeDropdown = screen.getByLabelText('add-filter-type');
    fireEvent.mouseDown(addFilterTypeDropdown);
    fireEvent.click(screen.getByText('Title'));

    const dynamicFilterDropdown = screen.getByLabelText('dynamic-filter');
    fireEvent.mouseDown(dynamicFilterDropdown);
    fireEvent.click(screen.getByText('Multi-Select'));

    const searchInput = screen.getByLabelText('Search');
    fireEvent.change(searchInput, { target: { value: 'test' } });

    fireEvent.click(screen.getByText('Add'));

    expect(addFilter).toHaveBeenCalledWith('title', {
      id: 'test',
      selector: '$in',
      query: 'test',
    });
  });

  test('clears all filters when Clear All button is clicked', async () => {
    render(
      <Filter
        filter={{ title: [{ id: 'test', query: 'test' }] }}
        addFilter={addFilter}
        removeFilter={removeFilter}
        columns={columns}
      />,
    );

    fireEvent.click(screen.getByText('Clear All'));

    expect(removeFilter).toHaveBeenCalledWith('title', 'test');
  });

  test('displays active filters correctly', async () => {
    render(
      <Filter
        filter={{ title: [{ id: 'test', query: 'test' }] }}
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
