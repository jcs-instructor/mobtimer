import { TimeUtil } from "./timeUtil";

export enum State {
  Ready = "READY",
  Running = "RUNNING",
  Paused = "PAUSED",
}

export class MobTimer {
  
  private _durationMinutes: number = 5;
  private _startTimeSeconds: number;
  private _state: State = State.Ready;
  private _timePausedSeconds: number;

  start() {
    this._state = State.Running;
    this._startTimeSeconds = TimeUtil.getCurrentSeconds();
  }

  pause() {
    this._state = State.Paused;
    this._timePausedSeconds = TimeUtil.getCurrentSeconds();
  }

  public get state(): State {
    return this._state;
  }

  public get timeRemainingString(): any {
    return TimeUtil.getTimeString(this.secondsRemaining);
  }
  
  public get secondsRemaining(): number {    
    let timeElapsedSeconds;
    if (this._startTimeSeconds) {
      const durationSeconds = TimeUtil.minutesToSeconds(this._durationMinutes);
      if (this._state == State.Paused) {
        timeElapsedSeconds = this._timePausedSeconds - this._startTimeSeconds; 
      }
      else {
        timeElapsedSeconds = TimeUtil.getCurrentSeconds() - this._startTimeSeconds; 
      }
      return durationSeconds - Math.round(timeElapsedSeconds);
    }
    return 0;
  }

  public get durationMinutes(): number {
    return this._durationMinutes;
  }
  public set durationMinutes(duration: number) {
    this._durationMinutes = duration;
  }
  
}


