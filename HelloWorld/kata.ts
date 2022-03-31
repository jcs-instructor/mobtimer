export function mobUrl(mobName) {
    return 'https://mobti.me/'+mobName;
}

let __duration: number = 5;
export function getDuration(): any {
    return __duration;
}

export function setDuration(duration) {
    __duration = duration;
} 