export function mobUrl(mobName) {
    return 'https://mobti.me/'+mobName;
}

export class MobTimer {
  getSecondsRemaining(): number {
    return 0;
  }
  
  private isRunning: boolean = false;
  
    getIsRunning(): boolean {
        return this.isRunning;
      }

    // getStartTime(): number {
    //   return this.startTime;
    // }
    // private startTime: number;
    start() {
      this.isRunning = true;
      // this.startTime = new Date().getTime();
    }

    private duration: number = 5;
    
    getDuration(): number {
        return this.duration;
    }

    setDuration(duration: number): void {
        this.duration = duration;
    } 

}