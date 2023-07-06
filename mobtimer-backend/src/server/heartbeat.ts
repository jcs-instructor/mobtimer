export class Heartbeat {
    
    func: () => void;
    minutesRemaining: number;
    
    constructor(durationMinutes: number, func = () => { }) {        
        console.log(durationMinutes, func);
        this.func = func;
        this.minutesRemaining = durationMinutes;
    }    

    start() {
      
    }
}