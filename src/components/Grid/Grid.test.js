import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import Grid from './Grid';

const mockCardData = [
  { id: 1, title: 'Card 1', artist: 'Artist 1', value: 100 },
  { id: 2, title: 'Card 2', artist: 'Artist 2', value: 200 },
  { id: 3, title: 'Card 3', artist: 'Artist 3', value: 300 },
];

const mockSetSelectedCards = jest.fn();

describe('Grid component', () => {
  beforeEach(() => {
    mockSetSelectedCards.mockClear();
  });

  it('renders correctly with given props', () => {
    render(
      <Grid
        cardData={mockCardData}
        selectedCards={[]}
        setSelectedCards={mockSetSelectedCards}
      />,
    );

    expect(screen.getByText('Card 1')).toBeInTheDocument();
    expect(screen.getByText('Card 2')).toBeInTheDocument();
    expect(screen.getByText('Card 3')).toBeInTheDocument();
  });

  it('renders the correct number of GridCard components', () => {
    render(
      <Grid
        cardData={mockCardData}
        selectedCards={[]}
        setSelectedCards={mockSetSelectedCards}
      />,
    );

    const cards = screen.getAllByText(/Card/);
    expect(cards).toHaveLength(mockCardData.length);
  });

  it('toggles card selection correctly', () => {
    render(
      <Grid
        cardData={mockCardData}
        selectedCards={[]}
        setSelectedCards={mockSetSelectedCards}
      />,
    );

    const checkbox = screen.getByLabelText('grid-checkbox-1');
    fireEvent.click(checkbox);

    expect(mockSetSelectedCards).toHaveBeenCalledWith([1]);
  });

  it('deselects card correctly', () => {
    render(
      <Grid
        cardData={mockCardData}
        selectedCards={[1]}
        setSelectedCards={mockSetSelectedCards}
      />,
    );

    const checkbox = screen.getByLabelText('grid-checkbox-1');
    fireEvent.click(checkbox);

    expect(mockSetSelectedCards).toHaveBeenCalledWith([]);
  });
});
