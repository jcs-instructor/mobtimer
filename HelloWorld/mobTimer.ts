import { TimeUtil } from "./timeUtil";

// todo: move or remove
export function mobUrl(mobName) {
  return "https://mobti.me/" + mobName;
}

export class MobTimer {
  
  private _durationMinutes: number = 5;
  private _secondsRemaining: number = 0;
  private _startTimeSeconds: number;

  public get timeRemainingString(): any {
    return TimeUtil.getTimeString(this._secondsRemaining);
  }
  
  public get secondsRemaining(): number {
    if (this._startTimeSeconds) {
      const durationSeconds = TimeUtil.minutesToSeconds(this._durationMinutes);
      const timeElapsedSeconds = TimeUtil.getCurrentSeconds() - this._startTimeSeconds;
      this._secondsRemaining = durationSeconds - Math.round(timeElapsedSeconds);
    }
    return this._secondsRemaining;
  }

  public get durationMinutes(): number {
    return this._durationMinutes;
  }
  public set durationMinutes(duration: number) {
    this._durationMinutes = duration;
  }

  private _isRunning: boolean = false;
  public get isRunning(): boolean {
    return this._isRunning;
  }

  start() {
    this._isRunning = true;
    this._secondsRemaining = this._durationMinutes * 60;
    this._startTimeSeconds = new Date().getTime() / 1000;
  }
}


