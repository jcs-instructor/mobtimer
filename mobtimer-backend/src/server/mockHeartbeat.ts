export class MockHeartbeat {
    func: () => void;
    
    constructor(durationMinutes: number, func = () => { }) {        
        console.log(durationMinutes, func);
        this.func = func;

    }

    mockDelayMinutes(minutes: number) {
      console.log("delay minutes = " + minutes);
      if (minutes === 15) {
        this.func();
      } else if (minutes === 30) {
        this.func();
        this.func();
      } 
    }
}