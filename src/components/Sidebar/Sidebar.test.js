import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Sidebar from './Sidebar';

describe('Sidebar Component', () => {
  it('renders Sidebar correctly', () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>,
    );

    const sidebarElement = screen.getByTestId('sidebar');
    expect(sidebarElement).toBeInTheDocument();
  });

  it('renders Dashboard SidebarItem', () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>,
    );

    const dashboardItem = screen.getByText('Dashboard');
    expect(dashboardItem).toBeInTheDocument();
  });

  it('renders Portfolio SidebarItem', () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>,
    );

    const portfolioItem = screen.getByText('Portfolio');
    expect(portfolioItem).toBeInTheDocument();
  });

  it('renders Messages SidebarItem', () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>,
    );

    const messagesItem = screen.getByText('Messages');
    expect(messagesItem).toBeInTheDocument();
  });

  it('renders Subscriptions SidebarItem', () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>,
    );

    const subscriptionsItem = screen.getByText('Subscriptions');
    expect(subscriptionsItem).toBeInTheDocument();
  });

  it('renders Workflows SidebarItem', () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>,
    );

    const workflowsItem = screen.getByText('Workflows');
    expect(workflowsItem).toBeInTheDocument();
  });

  it('renders API Keys SidebarItem', () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>,
    );

    const apiKeysItem = screen.getByText('API Keys');
    expect(apiKeysItem).toBeInTheDocument();
  });

  it('renders Settings SidebarItem', () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>,
    );

    const settingsItem = screen.getByText('Settings');
    expect(settingsItem).toBeInTheDocument();
  });
});
