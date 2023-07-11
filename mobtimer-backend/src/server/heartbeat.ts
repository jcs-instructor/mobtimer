import { TimeUtils } from "mobtimer-api";

export class Heartbeat {
  func: () => void;
  durationMinutes: number;
  maxInactivityMinutes: number;
  _interval: NodeJS.Timer | undefined;
  _timeout: NodeJS.Timeout | undefined;
  count: number = 0;

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
      () => {this.func(); this.count++;},
      TimeUtils.minutesToMilliseconds(this.durationMinutes)
    );
    this._timeout = setTimeout(
      () => clearInterval(this._interval),
      TimeUtils.minutesToMilliseconds(this.maxInactivityMinutes)
    );
  }

  restart() {
    clearInterval(this._interval);    
    clearTimeout(this._timeout);
    this.start();
  }
}