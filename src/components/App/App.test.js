import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import 'tests/setupTests.js';

import App from './App';

describe('App Component', () => {
  it('navigates to login page when not authenticated', async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/dashboard']}>
          <App />
        </MemoryRouter>,
      );
    });
    const loginButton = await screen.getByRole('button', {
      name: 'Login',
    });
    expect(loginButton).toBeInTheDocument();
  });

  it('login redirects to dashboard when authenticated', async () => {
    jest
      .spyOn(require('helpers/auth.helpers'), 'getToken')
      .mockReturnValue('validToken');
    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/login']}>
          <App />
        </MemoryRouter>,
      );
    });
  });

  it('navigates to dashboard when user is authenticated', async () => {
    jest
      .spyOn(require('helpers/auth.helpers'), 'getToken')
      .mockReturnValue('validToken');
    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/dashboard']}>
          <App />
        </MemoryRouter>,
      );
    });
  });
});
