import { MobTimerResponse } from "./server/mobTimerResponse";
import { Status } from "./status";
import { TimeUtils } from "./timeUtils";

export class MobTimer {
  private _mobName = "";
  private _durationMinutes = 5;
  private _whenStartedInSeconds = 0;
  private _status: Status = Status.Ready;
  private _whenPausedInSeconds = 0;
  private _nowInSecondsFunc = TimeUtils.getNowInSeconds;
  private _previouslyAccumulatedElapsedSeconds = 0;

  constructor(mobName: string = "") {
    this._mobName = mobName;
  }

  whenExpired(func: () => void) {
    setTimeout(func, TimeUtils.secondsToMilliseconds(1));
  }

  start() {
    this._status = Status.Running;
    this._whenStartedInSeconds = this._nowInSecondsFunc();
    // TimeUtils.delaySeconds(TimeUtil.minutesToSeconds(this._durationMinutes));
  }

  resume() {
    this._status = Status.Resumed;
    this._whenStartedInSeconds = this._nowInSecondsFunc();
  }

  public set nowInSecondsFunc(func: () => number) {
    this._nowInSecondsFunc = func;
  }

  pause() {
    this._status = Status.Paused;
    this._whenPausedInSeconds = this._nowInSecondsFunc();
    this._previouslyAccumulatedElapsedSeconds +=
      this._whenPausedInSeconds - this._whenStartedInSeconds;
  }

  public get state() {
    return {
      mobName: this._mobName,
      status: this.status,
      durationMinutes: this.durationMinutes,
    } as MobTimerResponse;
  }

  public get status(): Status {
    if (this.secondsRemaining <= 0) {
      this._status = Status.Ready;
    }
    return this._status;
  }

  public get secondsRemainingString(): string {
    return TimeUtils.getTimeString(this.secondsRemaining);
  }

  public get secondsRemaining(): number {
    // When the timer is ready, show "0:00" for the time.
    if (this._status == Status.Ready) {
      return 0;
    }
    const durationSeconds = TimeUtils.minutesToSeconds(this._durationMinutes);
    const elapsedSeconds = this.calculateElapsedSeconds();
    return durationSeconds - Math.round(elapsedSeconds);
  }

  private calculateElapsedSeconds() {
    if (this._status == Status.Ready) {
      return 0;
    } else if (this._status == Status.Paused) {
      return this._previouslyAccumulatedElapsedSeconds;
    } else {
      return (
        this._previouslyAccumulatedElapsedSeconds +
        (this._nowInSecondsFunc() - this._whenStartedInSeconds)
      );
    }
  }

  public get durationMinutes(): number {
    return this._durationMinutes;
  }
  public set durationMinutes(duration: number) {
    this._durationMinutes = duration;
  }
}
