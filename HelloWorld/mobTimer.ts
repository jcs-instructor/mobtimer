import { TimeUtil } from "./timeUtil";


export enum State {
  Ready = "READY",
  Running = "RUNNING",
  Paused = "PAUSED",
  Resumed = "RESUMED"
}

export class MobTimer {
  
  private _durationMinutes = 5;
  private _whenStartedInSeconds: number;
  private _state: State = State.Ready;
  private _whenPausedInSeconds: number;
  private _currentTimeSecondsFunc = TimeUtil.getCurrentSeconds;
  //todo: remove "time" from "timeElapsed" everywhere
  private _previouslyAccumulatedTimeElapsedSeconds = 0;
    
  start() {
    this._state = State.Running;
    this._whenStartedInSeconds = this._currentTimeSecondsFunc();
  }

  resume() {
    this._state = State.Resumed;
    this._whenStartedInSeconds = this._currentTimeSecondsFunc();
  }

  public set currentTimeSecondsFunc(func: () => number) {
    this._currentTimeSecondsFunc = func;
  }

  pause() {
    this._state = State.Paused;
    this._whenPausedInSeconds = this._currentTimeSecondsFunc();
    this._previouslyAccumulatedTimeElapsedSeconds += 
      (this._whenPausedInSeconds - this._whenStartedInSeconds);
  }

  public get state(): State {
    return this._state;
  }

  public get secondsRemainingString(): any {
    return TimeUtil.getTimeString(this.secondsRemaining);
  }
  
  public get secondsRemaining(): number {    
    // When the timer is ready, show "0:00" for the time.
    if (this._state == State.Ready) {
      return 0;
    }
    const durationSeconds = TimeUtil.minutesToSeconds(this._durationMinutes);
    const timeElapsedSeconds = this.calculateTimeElapsedSeconds();
    return durationSeconds - Math.round(timeElapsedSeconds);
  }

  private calculateTimeElapsedSeconds() {
    if (this._state == State.Ready) {
      return 0;
    } else if (this._state == State.Paused) {
      return this._previouslyAccumulatedTimeElapsedSeconds;
    } else {
      return (this._currentTimeSecondsFunc() - this._whenStartedInSeconds);
    }
  }

  public get durationMinutes(): number {
    return this._durationMinutes;
  }
  public set durationMinutes(duration: number) {
    this._durationMinutes = duration;
  }
  
}


