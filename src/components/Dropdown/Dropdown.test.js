import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import Dropdown from './Dropdown';

const mockOptions = [
  { id: -1, value: '', label: 'Select an option' },
  { id: 1, value: 'option1', label: 'Option 1' },
  { id: 2, value: 'option2', label: 'Option 2' },
];

describe('Dropdown component', () => {
  test('renders with initial value', () => {
    render(
      <Dropdown
        value=""
        onChange={() => {}}
        labelId="test-dropdown"
        options={mockOptions}
      />,
    );

    expect(screen.getByRole('combobox')).toHaveTextContent('Select an option');
  });

  test('renders with a selected value', () => {
    render(
      <Dropdown
        value="option1"
        onChange={() => {}}
        labelId="test-dropdown"
        options={mockOptions}
      />,
    );

    expect(screen.getByRole('combobox')).toHaveTextContent('Option 1');
  });

  test('displays options when clicked', () => {
    render(
      <Dropdown
        value=""
        onChange={() => {}}
        labelId="test-dropdown"
        options={mockOptions}
      />,
    );

    fireEvent.mouseDown(screen.getByRole('combobox'));

    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  test('calls onChange when an option is selected', () => {
    const handleChange = jest.fn();
    render(
      <Dropdown
        value=""
        onChange={handleChange}
        labelId="test-dropdown"
        options={mockOptions}
      />,
    );

    fireEvent.mouseDown(screen.getByRole('combobox'));
    fireEvent.click(screen.getByText('Option 1'));

    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
