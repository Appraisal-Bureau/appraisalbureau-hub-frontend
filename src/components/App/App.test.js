import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import '../../tests/setupTests.js';
import App from './App';

describe('App Component', () => {
  test('navigates to login page when not authenticated', async () => {
    await act(async () => {
      render(<App />, { wrapper: BrowserRouter });
    });
    expect(global.window.location.pathname).toContain('/login');
  });

  test('login redirects to dashboard when authenticated', async () => {
    jest
      .spyOn(require('helpers/auth.helpers'), 'getToken')
      .mockReturnValue('validToken');
    await act(async () => {
      render(<App />, { wrapper: BrowserRouter });
    });
    expect(global.window.location.pathname).toContain('/dashboard');
  });

  test('navigates to dashboard when user is authenticated', async () => {
    const nav = useNavigate();
    jest
      .spyOn(require('helpers/auth.helpers'), 'getToken')
      .mockReturnValue('validToken');
    await act(async () => {
      nav('/dashboard');
      render(<App />, { wrapper: BrowserRouter });
    });
    expect(global.window.location.pathname).toContain('dashboard');
  });
});
