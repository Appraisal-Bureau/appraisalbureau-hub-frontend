import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { portfolioTableData } from 'api/api.js';
import ActionButton from 'components/ActionButton/ActionButton';

import ActionBar from './ActionBar.js';

const mockProps = {
  searchText: 'Search portfolio',
  searchOptions: portfolioTableData,
  actionButtons: [<AddButton key={1} text="Add Artwork" />],
};

describe('Action Bar Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the ActionBar component correctly', () => {
    render(<ActionBar {...mockProps} showViewButtons={false} />);

    const searchBar = screen.getByLabelText('Search portfolio');
    expect(searchBar).toBeInTheDocument();
  });

  it('displays view buttons when showViewButtons is true', () => {
    render(<ActionBar {...mockProps} showViewButtons={true} />);
    // view buttons should be null
  });

  it('changes view button style when clicked', () => {
    // selected view should be blue
  });
});
