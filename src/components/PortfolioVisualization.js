import '../styles/PortfolioVisualization.scss';
import {Tooltip} from '@mui/material';

function PortfolioVisualization({data, barColors}) {
  return (
    <div className="portfolioVis">
      {data.map((item, index) => (
        <Tooltip key={index} sx={{fontSize: "16px"}} title={`${item.name}: $${item.value.toLocaleString()}`} placement="top">
          <div
            className="bar"
            style={{
              width: item.value,
              backgroundColor: barColors[index % 4]
            }}
          />
        </Tooltip>
      ))}
    </div>
  );
}

export default PortfolioVisualization;
