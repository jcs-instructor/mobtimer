export class TimeUtil {
  
  static getTimeString(seconds: number): any {
    return this.getMinutesPart(seconds) + ":" + 
           this.getSecondsPart(seconds);
  }
  
  static getMinutesPart(seconds: number): string {
    const minutesPart = Math.trunc(seconds / 60);
    return minutesPart.toString().padStart(2, "0");
  }
  
  static getSecondsPart(seconds: number) {
    const secondsPart = (seconds % 60);
    return secondsPart.toString().padStart(2, "0");
  }

}