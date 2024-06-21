import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { login } from 'api/auth';
import { setToken } from 'helpers/auth.helpers';
import { MemoryRouter } from 'react-router-dom';
import 'tests/setupTests';

import Login from './Login';

jest.mock('helpers/auth.helpers');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));
jest.mock('hooks/useScreenSize', () => ({
  __esModule: true,
  default: () => ({ isDesktopView: true }),
}));
jest.mock('api/auth');

describe('Login Component', () => {
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

  it('renders the Login form', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );

    expect(screen.getByPlaceholderText('Email address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  it('shows error message when form submission fails', async () => {
    login.mockRejectedValue({ message: 'Invalid credentials' });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByPlaceholderText('Email address'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

    await waitFor(() => {
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    });
  });

  it('navigates to the dashboard on successful login', async () => {
    login.mockResolvedValue({
      data: {
        jwt: 'fake-jwt-token',
        user: { username: 'testuser' },
      },
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByPlaceholderText('Email address'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

    await waitFor(() => {
      expect(setToken).toHaveBeenCalledWith('fake-jwt-token');
      expect(mockSetUser).toHaveBeenCalledWith({ username: 'testuser' });
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard', {
        replace: true,
      });
    });
  });

  it('clears the error message when the alert is closed', async () => {
    login.mockRejectedValue({ message: 'Invalid credentials' });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );

    fireEvent.change(screen.getByPlaceholderText('Email address'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

    await waitFor(() => {
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    });
  });
});
