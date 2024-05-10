import DateWidget from 'components/DateWidget/DateWidget';
import MuiTable from 'components/Table/Table';
import React from 'react';

import './ReportsList.scss';

function ReportsList({ data }) {
  const groupByYear = (data) => {
    const groupedData = {};
    data.forEach((item) => {
      const year = item.date.substring(0, 4);
      if (!groupedData[year]) {
        groupedData[year] = [];
      }
      groupedData[year].push(item);
    });
    for (const year in groupedData) {
      groupedData[year].sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    return groupedData;
  };

  const groupedData = groupByYear(data);

  return (
    <div className="reportsList">
      {Object.entries(groupedData).map(([year, reports]) => (
        <div className="report-container" key={year}>
          <h3>{year}</h3>
          {reports.map((report) => (
            <div key={report.id}>
              <DateWidget date={report.date} />
              <MuiTable
                columns={[
                  { key: 'title', header: 'Title' },
                  { key: 'artist', header: 'Artist' },
                  { key: 'collection', header: 'Collection' },
                ]}
                data={report.pieces}
                hideHeader={report.id > 1}
                style={{
                  padding: '4px 8px',
                  tableLayout: 'fixed',
                  display: 'inline-block',
                }}
              />
            </div>
          ))}
        </div>
      ))}
      <p className="actionButton" style={{ textAlign: 'center' }}>
        See All Upcoming
      </p>
    </div>
  );
}

export default ReportsList;
