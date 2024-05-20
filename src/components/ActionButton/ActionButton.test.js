import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';

import ActionButton from './ActionButton';

describe('ActionButton Component', () => {
  it('should render the ActionButton component with text', async () => {
    render(<ActionButton text="Click me" />);

    const buttonText = await screen.findByText('Click me');
    expect(buttonText).toBeInTheDocument();
  });
});
