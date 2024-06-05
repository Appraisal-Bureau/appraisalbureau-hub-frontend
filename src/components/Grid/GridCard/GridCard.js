import { Checkbox } from '@mui/material';
import { formatMoney } from 'helpers/portfolio.helpers';

import './GridCard.scss';

function GridCard({ data, isSelected, toggleCardSelect }) {
  return (
    <div className="grid-card">
      <div style={{ display: 'inline-block' }}>
        <Checkbox
          onClick={() => toggleCardSelect(data.id)}
          checked={isSelected}
          inputProps={{
            'aria-label': `grid-checkbox-${data.id}`,
          }}
        />
        <span>{data.title}</span>
      </div>
      <img src="" alt={data.title} />
      <div
        style={{
          display: 'inline-flex',
          paddingTop: '12px',
          paddingBottom: '12px',
        }}
      >
        <div className="left tertiary-body">{data.artist}</div>
        <div className="right">{formatMoney(data.value)}</div>
      </div>
    </div>
  );
}

export default GridCard;
