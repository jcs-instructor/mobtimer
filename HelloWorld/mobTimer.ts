import { TimeUtil } from "./timeUtil";

export enum State {
  Ready = "READY",
  Running = "RUNNING",
  Paused = "PAUSED",
}

export class MobTimer {
  
  private _durationMinutes: number = 5;
  private _whenStartedInSeconds: number;
  private _state: State = State.Ready;
  private _whenPausedInSeconds: number;

  start() {
    this._state = State.Running;
    this._whenStartedInSeconds = TimeUtil.getCurrentSeconds();
  }

  pause() {
    this._state = State.Paused;
    this._whenPausedInSeconds = TimeUtil.getCurrentSeconds();
  }

  public get state(): State {
    return this._state;
  }

  public get timeRemainingString(): any {
    return TimeUtil.getTimeString(this.secondsRemaining);
  }
  
  public get secondsRemaining(): number {    
    let timeElapsedSeconds;
    if (this._whenStartedInSeconds) {
      const durationSeconds = TimeUtil.minutesToSeconds(this._durationMinutes);
      if (this._state == State.Paused) {
        timeElapsedSeconds = this._whenPausedInSeconds - this._whenStartedInSeconds; 
      }
      else {
        timeElapsedSeconds = TimeUtil.getCurrentSeconds() - this._whenStartedInSeconds; 
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


