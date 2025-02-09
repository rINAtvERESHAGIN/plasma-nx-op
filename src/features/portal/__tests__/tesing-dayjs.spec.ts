import dayjs from 'dayjs';

describe('testing dayjs', () => {
  it('transform from \'2015-01-01T00:00:00.000Z\' to 2015-01-01', () => {
    const date = '2015-01-01T00:00:00.000Z';
    const newDate = dayjs(date).format('YYYY-MM-DD');

    expect(newDate).toBe('2015-01-01');
  });
});
