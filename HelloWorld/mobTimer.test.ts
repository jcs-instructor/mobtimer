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
  expect(mobTimer.timeRemainingString).toEqual("00:00");  
});

test('Get seconds remaining string after start for turn duration with fractional minutes', () => {
  const mobTimer = new MobTimer();
  mobTimer.durationMinutes = 5.5;
  mobTimer.start();
  expect(mobTimer.timeRemainingString).toEqual("05:30");  
});

test('Get seconds remaining string after start for turn duration with double digit minutes', () => {
  const mobTimer = new MobTimer();
  mobTimer.durationMinutes = 12;
  mobTimer.start();
  expect(mobTimer.timeRemainingString).toEqual("12:00");  
});

test('Get seconds remaining 2 seconds after start', async () => {
  const mobTimer = new MobTimer();
  mobTimer.durationMinutes = 6; 
  mobTimer.start();
  await delaySeconds(1); 
  expect(mobTimer.secondsRemaining).toEqual(6*60 - 1);
});

test('Get time remaining string 2 seconds after start', async () => {
  const mobTimer = new MobTimer();
  mobTimer.durationMinutes = 6; 
  mobTimer.start();
  await delaySeconds(1); 
  expect(mobTimer.timeRemainingString).toEqual("05:59");
});


test('Pause timer', () => {
  const mobTimer = new MobTimer();
  mobTimer.start();
  mobTimer.pause();
  expect(mobTimer.state).toEqual(State.Paused);
});


// test('Get seconds remaining after two second pause', async () => {
//   const mobTimer = new MobTimer();
//   mobTimer.durationMinutes = 6;
//   mobTimer.start();
//   mobTimer.pause();
//   await delaySeconds(2); 
//   expect(mobTimer.timeRemainingString).toEqual("06:00");
// });




function delaySeconds(seconds: number) {
  return new Promise( resolve => setTimeout(resolve, seconds*1000) );
}
