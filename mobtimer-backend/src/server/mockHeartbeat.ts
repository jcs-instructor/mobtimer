export class MockHeartbeat {
    func: () => void;
    
    constructor(durationMinutes: number, func = () => { }) {        
        console.log(durationMinutes, func);
        this.func = func;

    }

    mockDelayMinutes(minutes: number) {
      console.log("delay minutes = " + minutes);
      if (minutes >= 14) {
        this.func();
      }
    }
}