export class MockHeartbeat {
    func: () => void;
    _mockCurrentTimeMinutes = 0;
    minutesRemaining: number;
    
    constructor(durationMinutes: number, func = () => { }) {        
        console.log(durationMinutes, func);
        this.func = func;
        this.minutesRemaining = durationMinutes;
    }

    mockDelayMinutes(minutes: number) {
      console.log("delay minutes = " + minutes);
      this._mockCurrentTimeMinutes += minutes;
      const toleranceMinutes = 0.01;
      if (this.minutesRemaining <= toleranceMinutes) {
        this.func();
      }
    }
}