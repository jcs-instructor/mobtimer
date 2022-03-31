export function mobUrl(mobName) {
    return 'https://mobti.me/'+mobName;
}

export class MobTimer {

    __duration: number = 5;
    
    getDuration(): any {
        return this.__duration;
    }

    setDuration(duration) {
        this.__duration = duration;
    } 

}