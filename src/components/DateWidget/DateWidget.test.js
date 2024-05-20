import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';

import DateWidget from './DateWidget';

describe('DateWidget Component', () => {
  it('renders date and month abbreviation correctly', () => {
    const date = '2024-05-03';

    render(<DateWidget date={date} />);

    expect(screen.getByText('03')).toBeInTheDocument();
    expect(screen.getByText('May')).toBeInTheDocument();
  });
});
