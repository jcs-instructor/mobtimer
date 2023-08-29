import { TimeUtils } from "./timeUtils";

export class Heartbeat {
  onHeartbeatInterval: () => void;
  heartbeatDurationMinutes: number;
  maxInactivityMinutes: number;
  _interval: NodeJS.Timeout | undefined;
  _count: number = 0;

  public get count(): number {
    return this._count;
  }

  public get heartbeatDurationMilliseconds() {
    return TimeUtils.minutesToMilliseconds(this.heartbeatDurationMinutes);
  }

  public get maxInactivityMilliseconds() {
    return TimeUtils.minutesToMilliseconds(this.maxInactivityMinutes);
  }

  constructor(
    heartbeatDurationMinutes: number,
    maxInactivityMinutes: number,
    onHeartbeatInterval = () => {}
  ) {
    this.onHeartbeatInterval = onHeartbeatInterval;
    this.heartbeatDurationMinutes = heartbeatDurationMinutes;
    this.maxInactivityMinutes = maxInactivityMinutes;
  }

  start() {
    const startTimeMilliseconds = TimeUtils.getNowInMilliseconds();
    console.log("debug heartbeat start", startTimeMilliseconds)
    this._interval = setInterval(() => {
      console.log("debug heartbeat executing interval", this._count)
      const millisecondsElapsed =
        TimeUtils.getNowInMilliseconds() - startTimeMilliseconds;
      if (millisecondsElapsed > this.maxInactivityMilliseconds) {
        this.stop();
        return;
      }
      this.onHeartbeatInterval();
      this._count++;
    }, this.heartbeatDurationMilliseconds);
  }

  restart() {
    this.stop();
    console.log("restarting", new Date());
    this.start();
  }

  stop() {
    console.log("clearing");
    clearInterval(this._interval);
    this._interval?.unref();
  }
}
