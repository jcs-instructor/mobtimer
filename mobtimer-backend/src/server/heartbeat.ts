import { TimeUtils } from "mobtimer-api";

export class Heartbeat {
  func: () => void;
  durationMinutes: number;
  maxInactivityMinutes: number;
  _interval: NodeJS.Timer | undefined;

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
    this._interval = setInterval(
      this.func,
      TimeUtils.minutesToMilliseconds(this.durationMinutes)
    );
    setTimeout(
      () => clearInterval(this._interval),
      TimeUtils.minutesToMilliseconds(this.maxInactivityMinutes)
    );
  }

  restart() {
    clearInterval(this._interval);    
    this.start();
  }
}