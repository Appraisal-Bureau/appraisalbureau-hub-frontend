import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';

import AddButton from './AddButton';

describe('AddButton Component', () => {
  it('should render the AddButton component with text', async () => {
    render(<AddButton text="Click me" />);

    const buttonText = await screen.findByText('Click me');
    expect(buttonText).toBeInTheDocument();
  });
});
