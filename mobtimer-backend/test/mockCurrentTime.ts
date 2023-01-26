import { MobTimer } from "mobtimer-api";

export class MockCurrentTime {
  private _mockCurrentTimeSeconds = 0;
  mobTimer: MobTimer;

  constructor(mobTimer: MobTimer) {
    this.mobTimer = mobTimer;
    mobTimer.nowInSecondsFunc = () => this.mockNowInSecondsFunc();
  }

  private mockNowInSecondsFunc() {
    return this._mockCurrentTimeSeconds;
  }

  public delaySeconds(seconds: number) {
    this._mockCurrentTimeSeconds += seconds;
    const toleranceSeconds = 0.01; // for floating point precision issues
    if (this.mobTimer.secondsRemaining <= toleranceSeconds) {
      console.log("IN mock", this.mobTimer.secondsRemaining);
      this.mobTimer.reset();
    }
  }
}
