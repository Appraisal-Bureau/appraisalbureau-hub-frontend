import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import Portfolio from './Portfolio';

jest.mock('components/Table/Table', () => () => (
  <div data-testid="mui-table"></div>
));

const setState = jest.fn();
const useStateSpy = jest.spyOn(React, 'useState');
beforeEach(() => {
  useStateSpy.mockImplementation((init) => [init, setState]);
});

describe('Portfolio Component', () => {
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
