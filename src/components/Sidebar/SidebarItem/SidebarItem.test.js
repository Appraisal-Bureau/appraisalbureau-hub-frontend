import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import SidebarItem from './SidebarItem';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: '/dashboard',
  }),
}));

describe('SidebarItem Component', () => {
  const mockProps = {
    text: 'Dashboard',
    icon: 'dashboard.svg',
    linkDestination: 'dashboard',
  };
  it('renders SidebarItem correctly', async () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <SidebarItem {...mockProps} />
      </MemoryRouter>,
    );

    const sidebarItem = await screen.findByText('Dashboard');
    expect(sidebarItem).toBeInTheDocument();
  });

  it('activates when the current location matches linkDestination', async () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <SidebarItem {...mockProps} />
      </MemoryRouter>,
    );

    const sidebarItem = await screen.findByTestId('sidebar-item');
    expect(sidebarItem).toHaveClass('selected');
  });

  it('does not activate when the current location does not match linkDestination', async () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <SidebarItem
          text="Portfolio"
          icon="portfolio.svg"
          linkDestination="/portfolio"
        />
      </MemoryRouter>,
    );

    const sidebarItem = await screen.findByTestId('sidebar-item');
    expect(sidebarItem).not.toHaveClass('selected');
  });
});
