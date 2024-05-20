import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import Portfolio from './Portfolio';

jest.mock('components/Table/Table', () => () => (
  <div data-testid="mui-table"></div>
));

describe('Portfolio Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the Portfolio component correctly', () => {
    render(<Portfolio />);

    expect(screen.getByText('My Portfolio')).toBeInTheDocument();

    const table = screen.getAllByTestId('mui-table');
    expect(table).toHaveLength(1);

    const actionBar = screen.getByTestId('action-bar');
    expect(actionBar).toBeInTheDocument();
  });

  it('formats dates correctly', () => {
    render(<Portfolio />);
  });
});
