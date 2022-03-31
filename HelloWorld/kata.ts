export function mobUrl(mobName) {
    return 'https://mobti.me/'+mobName;
}

export class MobTimer {
    getStartTime(): number {
      return this.startTime;
    }
    private startTime: number;
    start() {
      this.startTime = new Date().getTime();
    }

    __duration: number = 5;
    
    getDuration(): number {
        return this.__duration;
    }

    setDuration(duration: number): void {
        this.__duration = duration;
    } 

}