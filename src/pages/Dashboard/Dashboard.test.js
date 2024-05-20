import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { portfolio } from 'api/api';
import { calculatePortfolioTotal } from 'helpers/portfolio.helpers';

import Dashboard from './Dashboard';

jest.mock('components/Card/Card', () => ({ bodyText }) => (
  <div data-testid="card">{bodyText}</div>
));
jest.mock(
  'components/PortfolioVisualization/PortfolioVisualization',
  () => () => <div data-testid="portfolio-visualization"></div>,
);
jest.mock('components/ReportsList/ReportsList', () => () => (
  <div data-testid="reports-list"></div>
));
jest.mock('components/Table/Table', () => () => (
  <div data-testid="mui-table"></div>
));

describe('Dashboard Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the Dashboard component correctly', () => {
    render(<Dashboard />);

    expect(screen.getByText('My Portfolio')).toBeInTheDocument();

    const cards = screen.getAllByTestId('card');
    expect(cards).toHaveLength(3);

    const portfolioTotal = calculatePortfolioTotal(portfolio);
    const currencyFormatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    });
    expect(
      screen.getByText(currencyFormatter.format(portfolioTotal)),
    ).toBeInTheDocument();

    expect(screen.getByTestId('portfolio-visualization')).toBeInTheDocument();

    const tables = screen.getAllByTestId('mui-table');
    expect(tables).toHaveLength(2);

    expect(screen.getByTestId('reports-list')).toBeInTheDocument();

    expect(screen.getByText('Portfolio Value')).toBeInTheDocument();
    expect(screen.getByText('Recent Activity')).toBeInTheDocument();
    expect(screen.getByText('Upcoming Reports')).toBeInTheDocument();
  });

  it('passes correct props to Card components', () => {
    render(<Dashboard />);

    expect(
      screen.getAllByText('Add another piece to your portfolio'),
    ).toHaveLength(1);
    expect(
      screen.getAllByText('Donate one or more pieces from your portfolio'),
    ).toHaveLength(1);
    expect(
      screen.getAllByText('Create a collection to organize your portfolio'),
    ).toHaveLength(1);
  });

  it('renders PortfolioVisualization component', () => {
    render(<Dashboard />);

    const portfolioVisComponent = screen.getByTestId('portfolio-visualization');
    expect(portfolioVisComponent).toBeInTheDocument();
  });

  it('renders MuiTable components', () => {
    render(<Dashboard />);

    const tables = screen.getAllByTestId('mui-table');
    expect(tables).toHaveLength(2);
  });

  it('renders ReportsList component', () => {
    render(<Dashboard />);

    const reportsListComponent = screen.getByTestId('reports-list');
    expect(reportsListComponent).toBeInTheDocument();
  });
});
