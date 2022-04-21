export function mobUrl(mobName) {
  return "https://mobti.me/" + mobName;
}

import { Duration } from './duration'

export class MobTimer {
  
  private _durationMinutes: number = 5;
  private _startTimeSeconds: number;

  
  private _secondsRemaining: number = 0;

  public get secondsRemaining(): number {
    if (this._startTimeSeconds) {
      // Todo: Extract methods for converting seconds to/from minutes (and same for ms)
      //       e.g., maybe duration.seconds, durationMinutes (or getSeconds...)
      this._secondsRemaining = 
        (this._durationMinutes * 60) + 
        Math.round(this._startTimeSeconds - (MobTimer.getCurrentMilliseconds()/1000));
    }
    return this._secondsRemaining;
  }

  public get durationMinutes(): number {
    return this._durationMinutes;
  }
  public set durationMinutes(duration: number) {
    this._durationMinutes = duration;
  }

  private static getCurrentMilliseconds() {
    return new Date().getTime();
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
