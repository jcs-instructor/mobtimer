import { TimeUtil } from "./timeUtil";

export enum StateEnum {
  Ready = "READY",
}

export class MobTimer {
  
  private _durationMinutes: number = 5;
  private _secondsRemaining: number = 0;
  private _startTimeSeconds: number;
  private _state: string = "READY"; // todo: make enum 
  stateEnum: StateEnum = StateEnum.Ready;

  public get state(): string {
    return this._state;
  }

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

  start() {
    this._state = "RUNNING";
    this._secondsRemaining = this._durationMinutes * 60;
    this._startTimeSeconds = new Date().getTime() / 1000;
  }
}


