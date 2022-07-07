import { MobTimerResponse } from "./server/mobTimerResponse";
import { Status } from "./status";
import { TimeUtils } from "./timeUtils";

export class MobTimer {
  private _mobName = "";
  private _durationMinutes = 5;
  private _whenStartedInSeconds = 0;
  private _whenPausedInSeconds = 0;
  private _nowInSecondsFunc = TimeUtils.getNowInSeconds;
  private _previouslyAccumulatedElapsedSeconds = 0;
  private _running = false;
  private _everStarted = false;
  private _timer: NodeJS.Timeout | undefined;

  constructor(mobName: string = "") {
    this._mobName = mobName;
  }

  whenExpired(func: () => void) {
    this._timer = setTimeout(func, TimeUtils.secondsToMilliseconds(1));
  }

  start() {
    this._running = true;
    this._everStarted = true;
    this._whenStartedInSeconds = this._nowInSecondsFunc();
  }

  resume() {
    this._running = true;
    this._whenStartedInSeconds = this._nowInSecondsFunc();
  }

  public set nowInSecondsFunc(func: () => number) {
    this._nowInSecondsFunc = func;
  }

  pause() {
    this._running = false;
    if (this._timer) clearTimeout(this._timer);
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
    // if (this._whenStartedInSeconds === 0) {
    //   return Status.Ready;
    // }

    // If timer hasn't been started or has elapsed fully, then: READY
    if (this.secondsRemaining <= 0 || !this._everStarted) {
      // || (!this._running &&
      //   this.secondsRemaining >=
      //     TimeUtils.minutesToSeconds(this.durationMinutes))
      return Status.Ready;
    } else if (this._running) {
      return Status.Running;
    } else {
      return Status.Paused;
    }
  }

  public get secondsRemainingString(): string {
    return TimeUtils.getTimeString(this.secondsRemaining);
  }

  public get secondsRemaining(): number {
    // When the timer is ready, show "0:00" for the time.
    if (!this._everStarted) {
      return 0;
    }
    const durationSeconds = TimeUtils.minutesToSeconds(this._durationMinutes);
    const elapsedSeconds = this.calculateElapsedSeconds();
    const result = durationSeconds - Math.round(elapsedSeconds);
    return result < 0 ? 0 : result;
  }

  private calculateElapsedSeconds() {
    if (!this._running) {
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
