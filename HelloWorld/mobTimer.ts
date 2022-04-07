export function mobUrl(mobName) {
  return "https://mobti.me/" + mobName;
}

import { Duration } from './duration'

export class MobTimer {
  
  private _startTimeSeconds: number;

  private _secondsRemaining: number = 0;
  getSecondsRemaining(): number {
    if (this._startTimeSeconds) {
      // Todo: Extract methods for converting seconds to/from minutes (and same for ms)
      //       e.g., maybe duration.seconds, duration.minutes (or getSeconds...)
      this._secondsRemaining = 
        (this._duration.getMinutes() * 60) + 
        Math.round(this._startTimeSeconds - (MobTimer.getCurrentMilliseconds()/1000));
    }
    return this._secondsRemaining;
  }

  private _duration: Duration = new Duration(5);
  getDuration(): Duration {
    return this._duration;
  }
  setDurationMinutes(duration: number): void {
    this._duration = new Duration(duration);
  }

  private static getCurrentMilliseconds() {
    return new Date().getTime();
  }

  private _isRunning: boolean = false;
  getIsRunning(): boolean {
    return this._isRunning;
  }

  start() {
    this._isRunning = true;
    this._secondsRemaining = this._duration.getMinutes() * 60;

    this._startTimeSeconds = new Date().getTime() / 1000;
  }
}
