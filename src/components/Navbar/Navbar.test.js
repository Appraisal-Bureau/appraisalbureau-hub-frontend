import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import Navbar from './Navbar';

jest.mock('helpers/auth.helpers', () => ({
  removeToken: jest.fn(),
}));

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate,
}));

describe('Navbar Component', () => {
  it('renders Navbar correctly', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    expect(screen.getByAltText('Appraisal Bureau Logo')).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Appraisal Bureau Logo' }),
    ).toHaveAttribute('href', '/dashboard');
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('handles logout correctly', () => {
    const { removeToken } = jest.requireMock('helpers/auth.helpers');

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByText('Logout'));

    expect(removeToken).toHaveBeenCalled();
    expect(mockedUseNavigate).toHaveBeenCalledWith('/login', {
      replace: true,
    });
  });
});
