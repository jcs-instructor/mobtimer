import { MobTimer } from "mobtimer-api";

export class MockCurrentTime extends MobTimer {
  private _mockCurrentTimeSeconds = 0;

  constructor(mobName: string = "") {
    super(mobName);
    this.nowInSecondsFunc = () => this.mockNowInSecondsFunc();
  }

  private mockNowInSecondsFunc() {
    return this._mockCurrentTimeSeconds;
  }

  public delaySeconds(seconds: number) {
    this._mockCurrentTimeSeconds += seconds;
    const toleranceSeconds = 0.01; // for floating point precision issues
    if (this.secondsRemaining <= toleranceSeconds) {
      console.log("IN mock", this.secondsRemaining);
      this.reset();
    }
  }
}
