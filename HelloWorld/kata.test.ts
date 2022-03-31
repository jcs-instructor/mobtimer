import { mobUrl, MobTimer } from './kata'

test('Create a mob url', () => {
  expect(mobUrl('arrested-egg')).toBe('https://mobti.me/arrested-egg');
});

test('Default duration is 5 minutes', () => {
  expect(MobTimer.getDuration()).toEqual(5);
});

test('Set duration to 6 minutes', () => {
  MobTimer.setDuration(6);
  expect(MobTimer.getDuration()).toEqual(6);
});


