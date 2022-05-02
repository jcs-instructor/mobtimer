import { MobTimer, State } from './mobTimer'
import { MockCurrentTime } from './mockCurrentTime'

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
  expect(mobTimer.secondsRemainingString).toEqual("00:00");  
});

test('Get seconds remaining string after start for turn duration with fractional minutes', () => {
  const mobTimer = new MobTimer();
  mobTimer.durationMinutes = 5.5;
  mobTimer.start();
  expect(mobTimer.secondsRemainingString).toEqual("05:30");  
});

test('Get seconds remaining string after start for turn duration with double digit minutes', () => {
  const mobTimer = new MobTimer();
  mobTimer.durationMinutes = 12;
  mobTimer.start();
  expect(mobTimer.secondsRemainingString).toEqual("12:00");  
});

test('Get seconds remaining 1 second after start', () => {
  const mobTimer = new MobTimer();
  const mockCurrentTime = new MockCurrentTime();
  mobTimer.currentTimeSecondsFunc = () => mockCurrentTime.mockCurrentTimeSecondsFunc();
  mobTimer.durationMinutes = 6; 
  mobTimer.start();
  expect(mobTimer.secondsRemaining).toEqual(6*60);
  mockCurrentTime.mockDelaySeconds(1); 
  expect(mobTimer.secondsRemaining).toEqual(6*60 - 1);
});

test('Get time remaining string 1 second after start', () => {
  const mobTimer = new MobTimer();
  const mockCurrentTime = new MockCurrentTime();
  mobTimer.currentTimeSecondsFunc = () => mockCurrentTime.mockCurrentTimeSecondsFunc();
  mobTimer.durationMinutes = 6; 
  mobTimer.start();
  mockCurrentTime.mockDelaySeconds(1); 
  expect(mobTimer.secondsRemainingString).toEqual("05:59");
});

test('Get seconds remaining 1 second after start (real)', async () => {
  const mobTimer = new MobTimer();
  mobTimer.durationMinutes = 6; 
  mobTimer.start();
  expect(mobTimer.secondsRemaining).toEqual(6*60);
  await delaySeconds(1); 
  expect(mobTimer.secondsRemaining).toEqual(6*60 - 1);
});


test('Pause timer', () => {
  const mobTimer = new MobTimer();
  mobTimer.start();
  mobTimer.pause();
  expect(mobTimer.state).toEqual(State.Paused);
});

test('Get seconds remaining after 1 second pause', () => {
  const mobTimer = new MobTimer();
  const mockCurrentTime = new MockCurrentTime();
  mobTimer.currentTimeSecondsFunc = () => mockCurrentTime.mockCurrentTimeSecondsFunc();
  mobTimer.durationMinutes = 6;
  mobTimer.start();
  mobTimer.pause();
  mockCurrentTime.mockDelaySeconds(1); 
  expect(mobTimer.secondsRemainingString).toEqual("06:00");
});

test('Get seconds remaining after running 1 second and paused 1', () => {
  const mobTimer = new MobTimer();
  const mockCurrentTime = new MockCurrentTime();
  mobTimer.currentTimeSecondsFunc = () => mockCurrentTime.mockCurrentTimeSecondsFunc();
  mobTimer.durationMinutes = 6;
  mobTimer.start();
  mockCurrentTime.mockDelaySeconds(1); 
  mobTimer.pause();
  mockCurrentTime.mockDelaySeconds(1); 
  expect(mobTimer.secondsRemainingString).toEqual("05:59");
});


function delaySeconds(seconds: number) {
  return new Promise( resolve => setTimeout(resolve, seconds*1000) );
}
// todo: add test to pause, resume, and pause again

