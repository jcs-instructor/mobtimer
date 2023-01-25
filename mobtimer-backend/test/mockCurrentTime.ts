import { MobTimer } from "mobtimer-api";

export class MockCurrentTime {
  private _mockCurrentTimeSeconds = 0;
  mobTimer: MobTimer;

  constructor(mobTimer: MobTimer) {
    this.mobTimer = mobTimer;
    mobTimer.nowInSecondsFunc = this.nowInSecondsFunc.bind(this);
  }

  public nowInSecondsFunc() {
    return this._mockCurrentTimeSeconds;
  }

  public delaySeconds(seconds: number) {
    this._mockCurrentTimeSeconds += seconds;
    if (this.mobTimer.secondsRemaining <= 0.1) {
      this.mobTimer.reset();
    }
  }
}
