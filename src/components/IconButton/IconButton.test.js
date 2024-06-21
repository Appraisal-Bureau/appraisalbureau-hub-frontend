import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Add from 'assets/icons/Add.svg';
import React from 'react';

import IconButton from './IconButton';

describe('IconButton Component', () => {
  it('should render the IconButton component with text', async () => {
    render(<IconButton text="Click me" icon={Add} />);

    const buttonText = await screen.findByText('Click me');
    expect(buttonText).toBeInTheDocument();
  });
});
