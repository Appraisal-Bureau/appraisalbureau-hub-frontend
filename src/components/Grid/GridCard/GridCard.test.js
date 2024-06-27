import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { formatMoney } from 'helpers/portfolio.helpers';
import React from 'react';

import GridCard from './GridCard';

jest.mock('helpers/portfolio.helpers', () => ({
  formatMoney: jest.fn(),
}));

const mockData = {
  id: 1,
  title: 'Artwork Title',
  artist: 'Artist Name',
  value: 1000,
};

const mockToggleCardSelect = jest.fn();

describe('GridCard component', () => {
  beforeEach(() => {
    formatMoney.mockReturnValue('$1,000');
  });

  it('renders correctly with given props', () => {
    render(
      <GridCard
        data={mockData}
        isSelected={false}
        toggleCardSelect={mockToggleCardSelect}
      />,
    );

    expect(screen.getByText('Artwork Title')).toBeInTheDocument();
    expect(screen.getByText('Artist Name')).toBeInTheDocument();
    expect(screen.getByText('$1,000')).toBeInTheDocument();
  });

  it('renders Checkbox with correct attributes', () => {
    render(
      <GridCard
        data={mockData}
        isSelected={false}
        toggleCardSelect={mockToggleCardSelect}
      />,
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute('aria-label', 'grid-checkbox-1');
    expect(checkbox).not.toBeChecked();
  });

  it('calls toggleCardSelect function when Checkbox is clicked', () => {
    render(
      <GridCard
        data={mockData}
        isSelected={false}
        toggleCardSelect={mockToggleCardSelect}
      />,
    );

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(mockToggleCardSelect).toHaveBeenCalledWith(mockData.id);
  });

  it('displays the correct data', () => {
    render(
      <GridCard
        data={mockData}
        isSelected={false}
        toggleCardSelect={mockToggleCardSelect}
      />,
    );

    expect(screen.getByText('Artwork Title')).toBeInTheDocument();
    expect(screen.getByText('Artist Name')).toBeInTheDocument();
    expect(screen.getByText('$1,000')).toBeInTheDocument();
  });

  it('renders Checkbox as checked when isSelected is true', () => {
    render(
      <GridCard
        data={mockData}
        isSelected={true}
        toggleCardSelect={mockToggleCardSelect}
      />,
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });
});
