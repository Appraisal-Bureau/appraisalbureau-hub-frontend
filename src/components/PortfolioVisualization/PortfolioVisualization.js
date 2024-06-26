import { Tooltip } from '@mui/material';

import './PortfolioVisualization.scss';

function PortfolioVisualization({ data, barColors }) {
  return (
    <div className="portfolioVis" data-testid="portfolio-visualization">
      {data.map((item, index) => (
        <Tooltip
          key={index}
          sx={{ fontSize: '16px' }}
          title={`${item.name}: $${item.value.toLocaleString()}`}
          placement="top"
        >
          <div
            className="bar"
            data-testid="portfolio-bar"
            style={{
              width: item.value,
              backgroundColor: barColors[index % 4],
            }}
          />
        </Tooltip>
      ))}
    </div>
  );
}

export default PortfolioVisualization;
