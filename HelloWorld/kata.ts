export function mobUrl(mobName) {
    return 'https://mobti.me/'+mobName;
}

export class MobTimer {

    static __duration: number = 5;
    
    static getDuration(): any {
        return MobTimer.__duration;
    }

    static setDuration(duration) {
        MobTimer.__duration = duration;
    } 

}