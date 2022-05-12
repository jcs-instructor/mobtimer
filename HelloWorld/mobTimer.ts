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
  private _nowInSecondsFunc = TimeUtil.getNowInSeconds;
  private _previouslyAccumulatedElapsedSeconds = 0;
    
  start() {
    this._state = State.Running;
    this._whenStartedInSeconds = this._nowInSecondsFunc();
  }

  resume() {
    this._state = State.Resumed;
    this._whenStartedInSeconds = this._nowInSecondsFunc();
  }

  public set nowInSecondsFunc(func: () => number) {
    this._nowInSecondsFunc = func;
  }

  pause() {
    this._state = State.Paused;
    this._whenPausedInSeconds = this._nowInSecondsFunc();
    this._previouslyAccumulatedElapsedSeconds += 
      (this._whenPausedInSeconds - this._whenStartedInSeconds);
  }

  public get state(): State {
    return this._state;
  }

  public get secondsRemainingString(): number {
    return TimeUtil.getTimeString(this.secondsRemaining);
  }
  
  public get secondsRemaining(): number {    
    // When the timer is ready, show "0:00" for the time.
    if (this._state == State.Ready) {
      return 0;
    }
    const durationSeconds = TimeUtil.minutesToSeconds(this._durationMinutes);
    const elapsedSeconds = this.calculateElapsedSeconds();
    return durationSeconds - Math.round(elapsedSeconds);
  }

  private calculateElapsedSeconds() {
    if (this._state == State.Ready) {
      return 0;
    } else if (this._state == State.Paused) {
      return this._previouslyAccumulatedElapsedSeconds;
    } else {
      return this._previouslyAccumulatedElapsedSeconds + (this._nowInSecondsFunc() - this._whenStartedInSeconds);
    }
  }

  public get durationMinutes(): number {
    return this._durationMinutes;
  }
  public set durationMinutes(duration: number) {
    this._durationMinutes = duration;
  }
  
}