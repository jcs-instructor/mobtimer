import { MobTimer, State } from './mobTimer'

test('Default duration is 5 minutes', () => {
  expect(new MobTimer().durationMinutes).toEqual(5);
});

test('Set duration to 3.5 minutes', () => {
  const mobTimer = new MobTimer();
  mobTimer.durationMinutes = 3.5;
  expect(mobTimer.durationMinutes).toEqual(3.5);
});

test('Initial state - timer is not running', () => {
  const mobTimer = new MobTimer();  
  expect(mobTimer.state).toEqual(State.Ready);
});

test('Start timer', () => {
  const mobTimer = new MobTimer();
  mobTimer.start();
  expect(mobTimer.state).toEqual(State.Running);
});

test('Get seconds remaining before start for turn duration with single digit minutes', () => {
  const mobTimer = new MobTimer();
  mobTimer.durationMinutes = 6;
  expect(mobTimer.secondsRemaining).toEqual(0);
  expect(mobTimer.timeRemainingString).toEqual("00:00");  
});

test('Get seconds remaining after start for turn duration with fractional minutes', () => {
  const mobTimer = new MobTimer();
  mobTimer.durationMinutes = 5.5;
  mobTimer.start();
  expect(mobTimer.secondsRemaining).toEqual(5.5*60);
  expect(mobTimer.timeRemainingString).toEqual("05:30");  
});

test('Get seconds remaining after start for turn duration with double digit minutes', () => {
  const mobTimer = new MobTimer();
  mobTimer.durationMinutes = 12;
  mobTimer.start();
  expect(mobTimer.secondsRemaining).toEqual(12*60);
  expect(mobTimer.timeRemainingString).toEqual("12:00");  
});

test('Get seconds remaining 2 seconds after start', async () => {
  const mobTimer = new MobTimer();
  mobTimer.durationMinutes = 6;
  mobTimer.start();
  await delaySeconds(2); 
  expect(mobTimer.secondsRemaining).toEqual(6*60 - 2);
  expect(mobTimer.timeRemainingString).toEqual("05:58");
});

test('Pause timer', () => {
  const mobTimer = new MobTimer();
  mobTimer.start();
  mobTimer.pause();
  expect(mobTimer.state).toEqual(State.Paused);
});


function delaySeconds(seconds: number) {
  return new Promise( resolve => setTimeout(resolve, seconds*1000) );
}
