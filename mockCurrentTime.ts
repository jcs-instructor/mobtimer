export class MockCurrentTime {
  
  private _mockCurrentTimeSeconds = 0;

  public nowInSecondsFunc() {
    return this._mockCurrentTimeSeconds;
  }

  public delaySeconds(seconds: number) {
    this._mockCurrentTimeSeconds += seconds;
  }
}