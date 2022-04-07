export class Duration {
    private minutes: number;
    
    constructor(minutes: number) {
        this.minutes = minutes;

    }

    getMinutes(): number {
        return this.minutes;
    }
  
}