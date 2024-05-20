import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import PortfolioVisualization from './PortfolioVisualization';

const mockData = [
  { name: 'A', value: 1000 },
  { name: 'B', value: 2000 },
  { name: 'C', value: 3000 },
];

const mockBarColors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00'];

describe('PortfolioVisualization Component', () => {
  it('renders PortfolioVisualization correctly', () => {
    render(
      <PortfolioVisualization data={mockData} barColors={mockBarColors} />,
    );

    const portfolioVisElement = screen.getByTestId('portfolio-visualization');
    expect(portfolioVisElement).toBeInTheDocument();
  });

  it('renders a tooltip for each data item', async () => {
    render(
      <PortfolioVisualization data={mockData} barColors={mockBarColors} />,
    );

    const bars = screen.getAllByTestId('portfolio-bar');
    let tooltipCount = 0;
    for (const bar of bars) {
      userEvent.hover(bar);
      const tooltip = await screen.findByRole('tooltip');
      expect(tooltip).toBeInTheDocument();
      tooltipCount++;
    }
    expect(tooltipCount).toBe(mockData.length);
  });

  it('renders bars with correct styles', () => {
    render(
      <PortfolioVisualization data={mockData} barColors={mockBarColors} />,
    );

    const bars = screen.getAllByTestId('portfolio-bar');

    bars.forEach((bar, index) => {
      expect(bar).toHaveStyle(`width: ${mockData[index].value}px`);
      expect(bar).toHaveStyle(`background-color: ${mockBarColors[index % 4]}`);
    });
  });
});
