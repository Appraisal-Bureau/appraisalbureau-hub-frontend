import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';

import Card from './Card';

describe('Card Component', () => {
  const mockProps = {
    imgSrc: 'test-image.jpg',
    imgAltText: 'Test Image',
    bodyText: 'Lorem ipsum dolor sit amet',
    actionButtonText: 'Click me',
  };

  test('should render the Card component with correct content', async () => {
    act(() => {
      render(<Card {...mockProps} />);
    });
    const imgElement = await screen.findByAltText(mockProps.imgAltText);
    const bodyElement = await screen.findByText(mockProps.bodyText);
    const actionButtonElement = await screen.findByText(
      mockProps.actionButtonText,
    );

    expect(imgElement).toBeInTheDocument();
    expect(bodyElement).toBeInTheDocument();
    expect(actionButtonElement).toBeInTheDocument();
  });
});
