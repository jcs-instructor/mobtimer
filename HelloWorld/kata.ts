export function mobUrl(mobName) {
  return "https://mobti.me/" + mobName;
}

import { Duration } from './duration'

export class MobTimer {
  
  private startTimeSeconds: number;

  private secondsRemaining: number = 0;
  getSecondsRemaining(): number {
    if (this.startTimeSeconds) {
      // Todo: Extract methods for converting seconds to/from minutes (and same for ms)
      //       e.g., maybe duration.seconds, duration.minutes (or getSeconds...)
      this.secondsRemaining = 
        (this.duration.getMinutes() * 60) + 
        Math.round(this.startTimeSeconds - (MobTimer.getCurrentMilliseconds()/1000));
    }
    return this.secondsRemaining;
  }

  private duration: Duration = new Duration(5);
  getDurationMinutes(): number {
    return this.duration.getMinutes();
  }
  setDurationMinutes(duration: number): void {
    this.duration = new Duration(duration);
  }

  private static getCurrentMilliseconds() {
    return new Date().getTime();
  }

  private isRunning: boolean = false;

  getIsRunning(): boolean {
    return this.isRunning;
  }

  start() {
    this.isRunning = true;
    this.secondsRemaining = this.duration.getMinutes() * 60;

    this.startTimeSeconds = new Date().getTime() / 1000;
  }
}
