export class TimeUtil {
  
  static getCurrentSeconds() {
    const currentMilliseconds = new Date().getTime();
    return TimeUtil.millisecondsToSeconds(currentMilliseconds); 
  }

  static millisecondsToSeconds(milliseconds: number) {
    return milliseconds / 1000;
  }
  
  static minutesToSeconds(minutes: number) : number {
    return minutes * 60;
  }
  
  static getTimeString(seconds: number): string {
    return TimeUtil.getMinutesPart(seconds) + ":" + 
           TimeUtil.getSecondsPart(seconds);
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