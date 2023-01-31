import { MobTimer } from "./mobTimer";

export class MobMockTimer extends MobTimer {
  private _mockCurrentTimeSeconds = 0;

  constructor(mobName: string = "") {
    super(mobName);
    this.nowInSecondsFunc = () => this.mockNowInSeconds();
  }

  private mockNowInSeconds() {
    return this._mockCurrentTimeSeconds;
  }

  public mockDelaySeconds(seconds: number) {
    this._mockCurrentTimeSeconds += seconds;
    const toleranceSeconds = 0.01; // for floating point precision issues
    if (this.secondsRemaining <= toleranceSeconds) {
      super.onExpire();
    }
  }
}
