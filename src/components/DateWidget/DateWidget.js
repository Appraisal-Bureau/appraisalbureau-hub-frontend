import { format, parseISO } from 'date-fns';

import './DateWidget.scss';

function DateWidget({ date }) {
  const parsedDate = parseISO(date);
  const formattedDate = format(parsedDate, 'dd');
  const monthAbbreviation = format(parsedDate, 'MMM');

  return (
    <div className="date-widget">
      <div className="big-number">{formattedDate}</div>
      <div className="month-abbreviation">{monthAbbreviation}</div>
    </div>
  );
}

export default DateWidget;
