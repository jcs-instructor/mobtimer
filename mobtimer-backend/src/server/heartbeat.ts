import { TimeUtils } from "mobtimer-api";

export class Heartbeat {
  func: () => void;
  durationMinutes: number;
  maxInactivityMinutes: number;

  constructor(
    durationMinutes: number,
    maxInactivityMinutes: number,
    func = () => {}
  ) {
    console.log(durationMinutes, func);
    this.func = func;
    this.durationMinutes = durationMinutes;
    this.maxInactivityMinutes = maxInactivityMinutes;
  }

  start() {
    const interval = setInterval(
      this.func,
      TimeUtils.minutesToMilliseconds(this.durationMinutes)
    );
    setTimeout(
      () => clearInterval(interval),
      TimeUtils.minutesToMilliseconds(this.maxInactivityMinutes)
    );
  }

  restart() {
    clearInterval(this._interval);
  }
}