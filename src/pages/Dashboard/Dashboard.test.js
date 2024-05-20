import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { portfolio } from 'api/api';
import { calculatePortfolioTotal } from 'helpers/portfolio.helpers';

import Dashboard from './Dashboard';

// Mock the imported custom components
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

    // Check if the title is rendered
    expect(screen.getByText('My Portfolio')).toBeInTheDocument();

    // Check if all the cards are rendered
    const cards = screen.getAllByTestId('card');
    expect(cards).toHaveLength(3);

    // Check if the portfolio value is rendered correctly
    const portfolioTotal = calculatePortfolioTotal(portfolio);
    const currencyFormatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    });
    expect(
      screen.getByText(currencyFormatter.format(portfolioTotal)),
    ).toBeInTheDocument();

    // Check if the PortfolioVisualization is rendered
    expect(screen.getByTestId('portfolio-visualization')).toBeInTheDocument();

    // Check if the first MuiTable is rendered
    const tables = screen.getAllByTestId('mui-table');
    expect(tables).toHaveLength(2);

    // Check if the ReportsList is rendered
    expect(screen.getByTestId('reports-list')).toBeInTheDocument();

    // Check section headers
    expect(screen.getByText('Portfolio Value')).toBeInTheDocument();
    expect(screen.getByText('Recent Activity')).toBeInTheDocument();
    expect(screen.getByText('Upcoming Reports')).toBeInTheDocument();
  });

  it('passes correct props to Card components', () => {
    render(<Dashboard />);

    // Check if Card props are passed correctly (This may require more elaborate mocking or spying)
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

    // PortfolioVisualization should receive the correct data
    const portfolioVisComponent = screen.getByTestId('portfolio-visualization');
    expect(portfolioVisComponent).toBeInTheDocument();
  });

  it('renders MuiTable components', () => {
    render(<Dashboard />);

    // Check if both tables are rendered correctly with data
    const tables = screen.getAllByTestId('mui-table');
    expect(tables).toHaveLength(2);
  });

  it('renders ReportsList component', () => {
    render(<Dashboard />);

    // ReportsList should receive the correct data
    const reportsListComponent = screen.getByTestId('reports-list');
    expect(reportsListComponent).toBeInTheDocument();
  });
});
