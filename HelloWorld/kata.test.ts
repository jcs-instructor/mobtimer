import { mobUrl, getDuration, setDuration } from './kata'

test('Create a mob url', () => {
  expect(mobUrl('arrested-egg')).toBe('https://mobti.me/arrested-egg');
});

test('Default duration is 5 minutes', () => {
  expect(getDuration()).toEqual(5);
});

test('Set duration to 6 minutes', () => {
  setDuration(6);
  expect(getDuration()).toEqual(6);
});


