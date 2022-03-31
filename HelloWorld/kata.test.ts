import { mobUrl, MobTimer } from './kata'

test('Create a mob url', () => {
  expect(mobUrl('arrested-egg')).toBe('https://mobti.me/arrested-egg');
});

test('Default duration is 5 minutes', () => {
  expect(new MobTimer().getDuration()).toEqual(5);
});

test('Set duration to 6 minutes', () => {
  const mobTimer = new MobTimer();
  mobTimer.setDuration(6);
  expect(mobTimer.getDuration()).toEqual(6);
});


