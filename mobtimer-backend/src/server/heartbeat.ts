import { TimeUtils } from "mobtimer-api";

export class Heartbeat {
    
    func: () => void;
    durationMinutes: number;
    
    constructor(durationMinutes: number, func = () => { }) {        
        console.log(durationMinutes, func);
        this.func = func;
        this.durationMinutes = durationMinutes;
    }    

    start() {
      const interval = setInterval(this.func, TimeUtils.minutesToMilliseconds(this.durationMinutes));
    }
}