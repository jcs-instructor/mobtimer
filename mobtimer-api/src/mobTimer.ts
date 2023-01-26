import { MobState } from "./mobState";
import { Status } from "./status";
import { TimeUtils } from "./timeUtils";

export class MobTimer {
  private _mobName = "";
  private _durationMinutes = 5;
  private _whenLastStartedInSeconds = 0;
  private _whenPausedInSeconds = 0;
  private _nowInSecondsFunc = TimeUtils.getNowInSeconds;
  private _previouslyAccumulatedElapsedSeconds = 0;
  private _running = false;
  private _timer: NodeJS.Timeout | undefined;
  private _timerExpireFunc = () => {};
  private _ready = true;
  sockets: any;

  constructor(mobName: string = "") {
    this._mobName = mobName;
  }

  private setExpireTimeout() {
    // We will wait until very near when the timer should expire, and then very
    // frequently check to see if the timer has expired. This is to avoid
    // the case where the timer expires before we have had time to check.
    const timeoutMilliseconds = TimeUtils.secondsToMilliseconds(this.secondsRemaining);
    this._timer = setTimeout(() => {
      this.reset();
    }, timeoutMilliseconds);
    if (this._timer.unref) this._timer.unref();
  }

  reset() {
    this.pause();
    this._ready = true;
    if (this._timerExpireFunc) {
      this._timerExpireFunc();
    }
    if (this._timer) clearTimeout(this._timer);
  }

  start() {
    this._running = true;
    if (this._ready) {
      this._previouslyAccumulatedElapsedSeconds = 0;
      this._ready = false;
    }
    this._whenLastStartedInSeconds = this._nowInSecondsFunc();
    this.setExpireTimeout();
  }

  public set nowInSecondsFunc(func: () => number) {
    this._nowInSecondsFunc = func;
  }

  public set timerExpireFunc(func: () => void) {
    this._timerExpireFunc = func;
  }

  pause() {
    this._running = false;
    if (this._timer) clearTimeout(this._timer);
    this._whenPausedInSeconds = this._nowInSecondsFunc();
    this._previouslyAccumulatedElapsedSeconds +=
      this._whenPausedInSeconds - this._whenLastStartedInSeconds;
  }

  public get state() {
    return {
      mobName: this._mobName,
      status: this.status,
      durationMinutes: this.durationMinutes,
      secondsRemaining: this.secondsRemaining,
    } as MobState;
  }

  setSecondsRemaining(secondsRemaining: number) {
    // You can't set seconds remaining directly since it's a calculated number, so change the correlated variables to have that effect:
    // Example: if duration = 1 minute and secondsRemaining = 20 seconds, then previously accumulated elapsed seconds = 40 seconds
    const durationSeconds = TimeUtils.minutesToSeconds(this._durationMinutes);
    this._previouslyAccumulatedElapsedSeconds =
      durationSeconds - secondsRemaining;
    this._whenLastStartedInSeconds = this._nowInSecondsFunc();
  }

  public get status(): Status {
    // if (this._whenStartedInSeconds === 0) {
    //   return Status.Ready;
    // }

    // If timer hasn't been started or has elapsed fully, then: READY
    if (this._ready) {
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
    if (this._ready) {
      return 0;
    }
    const durationSeconds = TimeUtils.minutesToSeconds(this._durationMinutes);
    const elapsedSeconds = this.calculateElapsedSeconds();
    return durationSeconds - elapsedSeconds;
  }

  private calculateElapsedSeconds() {
    if (!this._running) {
      return this._previouslyAccumulatedElapsedSeconds;
    } else {
      console.log("prev, now, lastStarted", this._mobName, this._previouslyAccumulatedElapsedSeconds, this._nowInSecondsFunc(), this._whenLastStartedInSeconds);
      return (
        this._previouslyAccumulatedElapsedSeconds +
        (this._nowInSecondsFunc() - this._whenLastStartedInSeconds)
      );
    }
  }

  public get durationMinutes(): number {
    return this._durationMinutes;
  }
  public set durationMinutes(duration: number) {
    this._durationMinutes = duration;
  }

  public get durationSeconds(): number {
    return this._durationMinutes * 60;
  }
}
