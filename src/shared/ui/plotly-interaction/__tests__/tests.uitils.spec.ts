import { transformYearsToDates } from '../utils';

describe('transformYearsToDates', () => {
  const targetDates = ['2016-01-04', '2018-01-01'];

  it('transforms years to closest dates correctly with one target date', () => {
    const years = [2015, 2017];
    const expected = ['2016-01-04', '2016-01-04'];
    const result = transformYearsToDates(years, ['2016-01-04']);
    expect(result).toEqual(expected);
  });

  it('returns an empty array for an empty list of years', () => {
    const years: number[] = [];
    const result = transformYearsToDates(years, targetDates);
    expect(result).toHaveLength(0);
  });

  it('transforms years to closest dates correctly with multiple target dates', () => {
    const years = [2015, 2017, 2019];
    const expected = ['2016-01-04', '2018-01-01', '2018-01-01'];
    const result = transformYearsToDates(years, targetDates);
    expect(result).toEqual(expected);
  });
});
