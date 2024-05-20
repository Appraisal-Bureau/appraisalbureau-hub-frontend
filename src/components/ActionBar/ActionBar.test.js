import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import ActionBar from './ActionBar.test';
import ActionButton from 'components/ActionButton/ActionButton';

const mockProps = {
  text: 'Search portfolio',
  filterOptions: {},
  actionButtons: [<ActionButton text="Add Artwork" />]
};

describe('Action Bar Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the ActionBar component correctly', () => {
    render(<ActionBar {...mockProps, showViewButtons=true} />);

    const searchBar = screen.getAllByPlaceholderText('Search portfolio');
    expect(searchBar).toBeInTheDocument();
  });

  it('does not display view buttons when showViewButtons is false', () => {
    render (<ActionBar {...mockProps, showViewButtons=false} />);
    // view buttons should be null
  })

  it('changes view button style when clicked', () => {
    // selected view should be blue
  });
});
