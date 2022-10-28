import {FormatElapsedTime} from '../src/utils/StringUtil';

describe('Formatters ->', () => {
  it('should convert to years', () => {
    const a = new Date('1/1/2020 12:00:00');
    const b = new Date('1/1/2021 12:01:01');
    const c = new Date('1/2/2022 12:01:01');

    const formattedA = FormatElapsedTime(b.getTime() - a.getTime());
    const formattedB = FormatElapsedTime(c.getTime() - a.getTime());

    expect(formattedA).toEqual('1 year');
    expect(formattedB).toEqual('2 years');
  });

  it('should convert to months', () => {
    const a = new Date('1/1/2020 12:00:00');
    const b = new Date('2/1/2020 12:01:01');
    const c = new Date('3/1/2020 12:01:01');

    const formattedA = FormatElapsedTime(b.getTime() - a.getTime());
    const formattedB = FormatElapsedTime(c.getTime() - a.getTime());

    expect(formattedA).toEqual('1 month');
    expect(formattedB).toEqual('2 months');
  });

  it('should convert to days', () => {
    const a = new Date('1/1/2020 12:00:00');
    const b = new Date('1/2/2020 12:00:00');
    const c = new Date('1/3/2020 12:00:00');

    const formattedA = FormatElapsedTime(b.getTime() - a.getTime());
    const formattedB = FormatElapsedTime(c.getTime() - a.getTime());

    expect(formattedA).toEqual('1 day');
    expect(formattedB).toEqual('2 days');
  });

  it('should convert to minutes', () => {
    const a = new Date('1/1/2020 12:00:00');
    const b = new Date('1/1/2020 12:01:00');
    const c = new Date('1/1/2020 12:20:00');

    const formattedA = FormatElapsedTime(b.getTime() - a.getTime());
    const formattedB = FormatElapsedTime(c.getTime() - a.getTime());

    expect(formattedA).toEqual('1 minute');
    expect(formattedB).toEqual('20 minutes');
  });

  it('should convert to seconds', () => {
    const a = new Date('1/1/2020 12:00:00');
    const b = new Date('1/1/2020 12:00:01');
    const c = new Date('1/1/2020 12:00:30');

    const formattedA = FormatElapsedTime(b.getTime() - a.getTime());
    const formattedB = FormatElapsedTime(c.getTime() - a.getTime());

    expect(formattedA).toEqual('1 second');
    expect(formattedB).toEqual('30 seconds');
  });

  it('should convert to now', () => {
    const a = new Date('1/1/2020 12:00:00');
    const formattedA = FormatElapsedTime(a.getTime() - a.getTime());
    expect(formattedA).toEqual('now');
  });
});
