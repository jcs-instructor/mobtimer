export class MockHeartbeat {
    
    constructor(durationMinutes: number, func = () => { }) {        
        console.log(durationMinutes, func);
    }

    mockDelayMinutes(minutes: number) {
      console.log("delay minutes = " + minutes);
    }
}