let mockCurrentTimeSeconds = 0;

export function mockCurrentTimeSecondsFunc() {
  return mockCurrentTimeSeconds;
}

export function mockDelaySeconds(seconds: number) {
  mockCurrentTimeSeconds += seconds;
}