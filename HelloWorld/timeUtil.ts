export class TimeUtil {
  
  static getTimeString(secondsRemaining: number): any {
    return this.getMinutesPart(secondsRemaining) + ":" + 
           this.getSecondsPart(secondsRemaining);
  }
  
  static getMinutesPart(secondsRemaining: number): string {
    const minutesPart = Math.trunc(secondsRemaining / 60);
    return minutesPart.toString().padStart(2, "0");
  }
  
  static getSecondsPart(secondsRemaining: number) {
    const secondsPart = (secondsRemaining % 60);
    return secondsPart.toString().padStart(2, "0");
  }

}