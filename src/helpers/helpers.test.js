import { format, parseISO } from 'date-fns';

import {
  calculatePortfolioTotal,
  filterIsEmpty,
  formatDate,
  formatFilterForQuery,
  formatMoney,
} from './portfolio.helpers';

describe('Portfolio helpers', () => {
  describe('calculatePortfolioTotal', () => {
    it('calculates the total value of the portfolio', () => {
      const portfolio = [{ value: 100 }, { value: 200 }, { value: 300 }];
      const result = calculatePortfolioTotal(portfolio);
      expect(result).toBe(600);
    });

    it('returns 0 for an empty portfolio', () => {
      const portfolio = [];
      const result = calculatePortfolioTotal(portfolio);
      expect(result).toBe(0);
    });
  });

  describe('formatDate', () => {
    it('formats a valid date correctly', () => {
      const date = '2023-01-15T00:00:00Z';
      const result = formatDate(date);
      expect(result).toBe('Jan 15, 2023');
    });

    it('returns "Unavailable" for an undefined date', () => {
      const result = formatDate(undefined);
      expect(result).toBe('Unavailable');
    });
  });

  describe('formatMoney', () => {
    it('formats a valid number correctly', () => {
      const value = 1000;
      const result = formatMoney(value);
      expect(result).toBe('$1,000');
    });

    it('returns "Unavailable" for an undefined value', () => {
      const result = formatMoney(undefined);
      expect(result).toBe('Unavailable');
    });
  });

  describe('filterIsEmpty', () => {
    it('returns true for an empty filter', () => {
      const filter = {
        key1: [],
        key2: [],
      };
      const result = filterIsEmpty(filter);
      expect(result).toBe(true);
    });

    it('returns false for a non-empty filter', () => {
      const filter = {
        key1: ['value1'],
        key2: [],
      };
      const result = filterIsEmpty(filter);
      expect(result).toBe(false);
    });
  });

  describe('formatFilterForQuery', () => {
    it('formats a filter correctly for a single item', () => {
      const filter = {
        key1: [{ selector: '$eq', query: 'value1' }],
        key2: [],
      };
      const result = formatFilterForQuery(filter);
      expect(result).toEqual({
        key1: { $eq: 'value1' },
        $or: [],
      });
    });

    it('formats a filter correctly for multiple items', () => {
      const filter = {
        key1: [
          { selector: '$eq', query: 'value1' },
          { selector: '$eq', query: 'value2' },
        ],
        key2: [],
      };
      const result = formatFilterForQuery(filter);
      expect(result).toEqual({
        $or: [{ key1: { $eq: 'value1' } }, { key1: { $eq: 'value2' } }],
      });
    });

    it('formats a filter correctly with number queries', () => {
      const filter = {
        title: [{ selector: '$eq', query: 'value1' }],
        value: [
          { selector: '$eq', query: 5 },
          { selector: '$between', query: [2, 3] },
        ],
        key2: [],
      };
      const result = formatFilterForQuery(filter);
      const expected = {
        $or: [
          {
            value: {
              $eq: 5,
            },
          },
          {
            value: {
              $between: [2, 3],
            },
          },
        ],
        title: {
          $eq: 'value1',
        },
      };
      expect(result).toEqual(expected);
    });
  });
});
