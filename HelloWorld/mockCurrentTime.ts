export class MockCurrentTime {
  private _mockCurrentTimeSeconds = 0;

  public mockNowInSecondsFunc() {
    return this._mockCurrentTimeSeconds;
  }

  public mockDelaySeconds(seconds: number) {
    this._mockCurrentTimeSeconds += seconds;
  }
}