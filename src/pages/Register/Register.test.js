import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { setToken } from 'helpers/auth.helpers';
import { MemoryRouter } from 'react-router-dom';
import apiClient from 'services/apiService';
import 'tests/setupTests.js';

import Register from './Register';

jest.mock('services/apiService');
jest.mock('helpers/auth.helpers');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));
jest.mock('hooks/useScreenSize', () => ({
  __esModule: true,
  default: () => ({ isDesktopView: true }),
}));

describe('Register Component', () => {
  const mockNavigate = jest.fn();
  const mockSetUser = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest
      .spyOn(require('react-router-dom'), 'useNavigate')
      .mockImplementation(() => mockNavigate);
    jest
      .spyOn(require('context/AuthContext'), 'useAuthContext')
      .mockImplementation(() => ({
        setUser: mockSetUser,
      }));
  });

  it('renders the Register form', () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>,
    );

    expect(screen.getByText('Register')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('shows error message when form submission fails', async () => {
    apiClient.post.mockRejectedValue({ message: 'Registration failed' });

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password' },
    });
    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(screen.getByText('Registration failed')).toBeInTheDocument();
    });
  });

  it('navigates to the dashboard on successful registration', async () => {
    apiClient.post.mockResolvedValue({
      data: {
        jwt: 'fake-jwt-token',
        user: { username: 'testuser' },
      },
    });

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password' },
    });
    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(setToken).toHaveBeenCalledWith('fake-jwt-token');
      expect(mockSetUser).toHaveBeenCalledWith({ username: 'testuser' });
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard', {
        replace: true,
      });
    });
  });

  it('clears the error message when the alert is closed', async () => {
    apiClient.post.mockRejectedValue({ message: 'Registration failed' });

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password' },
    });
    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(screen.getByText('Registration failed')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /Close/i }));

    await waitFor(() => {
      expect(screen.queryByText('Registration failed')).not.toBeInTheDocument();
    });
  });
});
