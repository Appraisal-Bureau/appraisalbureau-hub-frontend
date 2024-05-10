import toBeInTheDocument from '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';

import ActionButton from './ActionButton';

describe('ActionButton Component', () => {
  it('should render the ActionButton component with text', () => {
    const { getByText } = render(<ActionButton text="Click me" />);

    const buttonText = getByText('Click me');
    expect(buttonText).toBeInTheDocument();
  });
});
