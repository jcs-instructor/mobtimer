export function mobUrl(mobName) {
  return "https://mobti.me/" + mobName;
}

export class MobTimer {
  
  private _durationMinutes: number = 5;
  private _secondsRemaining: number = 0;
  private _startTimeSeconds: number;
  
  public get timeString(): any {
    return getMinutesPart(this._secondsRemaining) + ":" + getSecondsPart(this._secondsRemaining);
  }
  
  public get secondsRemaining(): number {
    if (this._startTimeSeconds) {
      // Todo: Look at refactoring magic numbers or removing entire function
      this._secondsRemaining = 
        (this._durationMinutes * 60) + 
        Math.round(this._startTimeSeconds - (MobTimer.getCurrentMilliseconds()/1000));
    }
    return this._secondsRemaining;
  }

  public get durationMinutes(): number {
    return this._durationMinutes;
  }
  public set durationMinutes(duration: number) {
    this._durationMinutes = duration;
  }

  private static getCurrentMilliseconds() {
    return new Date().getTime();
  }

  private _isRunning: boolean = false;
  public get isRunning(): boolean {
    return this._isRunning;
  }

  start() {
    this._isRunning = true;
    this._secondsRemaining = this._durationMinutes * 60;

    this._startTimeSeconds = new Date().getTime() / 1000;
  }
}

function getMinutesPart(_secondsRemaining: number): string {
  return "0" + Math.round(_secondsRemaining / 60 - 0.49);
}

function getSecondsPart(_secondsRemaining: number) {
  return ((_secondsRemaining % 60) + "").padStart(2, "0"); 
}

