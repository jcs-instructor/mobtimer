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

test('Start timer', () => {
  const mobTimer = new MobTimer();
  mobTimer.start();
  expect(mobTimer.getIsRunning()).toEqual(true);
});

test('Initial state - timer is not running', () => {
  const mobTimer = new MobTimer();  
  expect(mobTimer.getIsRunning()).toEqual(false);
});


