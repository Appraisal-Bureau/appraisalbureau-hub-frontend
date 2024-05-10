import './DateWidget.scss';

function DateWidget({ date }) {
  const parsedDate = new Date(date);
  const monthAbbreviation = parsedDate.toLocaleString('default', {
    month: 'short',
  });

  return (
    <div className="date-widget">
      <div className="big-number">{parsedDate.getDate()}</div>
      <div className="month-abbreviation">{monthAbbreviation}</div>
    </div>
  );
}

export default DateWidget;
