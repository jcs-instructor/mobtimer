import { TimeUtils } from "mobtimer-api";

export class Heartbeat {

  func: () => void;
  durationMinutes: number;
  maxInactivityMinutes: number;
  _interval: NodeJS.Timer | undefined;
  _timeout: NodeJS.Timeout | undefined;
  _count: number = 0;

  public get count(): number {
    return this._count;
  }  

  public get durationMilliseconds() {
    return TimeUtils.minutesToMilliseconds(this.durationMinutes); 
  }

  public get maxInactivityMilliseconds() {
    return TimeUtils.minutesToMilliseconds(this.maxInactivityMinutes);
  }

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
    const startTimeMilliseconds = TimeUtils.getNowInMilliseconds();
    this._interval = setInterval(
      () => {
        const millisecondsElapsed =
          TimeUtils.getNowInMilliseconds() - startTimeMilliseconds;
                  console.log(
                    "in interval",
                    new Date(),
                    millisecondsElapsed,
                    this._count,
                    this.maxInactivityMilliseconds
                  );

             if (millisecondsElapsed > this.maxInactivityMilliseconds) {
              console.log("clearing");
               clearInterval(this._interval);
               return;
             }
        this.func(); this._count++;

 
    }
      ,
      this.durationMilliseconds
    );

  }

  restart() {
    console.log("restarting", new Date());
    clearInterval(this._interval);    
    this._interval?.unref();

    clearTimeout(this._timeout);
    this._timeout?.unref();

    this.start();
  }

  stop() {
    clearInterval(this._interval);
    this._interval?.unref();
  }
}