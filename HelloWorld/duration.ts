export class Duration {
    private _minutes: number;
    
    constructor(minutes: number) {
        this._minutes = minutes;
    }

    public get minutes(): number {
        return this._minutes;
    }
}