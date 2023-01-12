import React, { useEffect, useState } from 'react';
import { MobTimer, TimeUtils } from 'mobtimer-api';

const frontendMobTimer = new MobTimer('front-end-timer');

const Timer = () => {

    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        //Component mounted
        const interval = setInterval(() => {
            setSeconds(frontendMobTimer.secondsRemaining);
        }, 1000);

        //Component will unmount
        return () => { clearInterval(interval) }

    }, [seconds]);

    return (
        <p>{TimeUtils.getTimeString(seconds)}</p>
    );

}

export default Timer;
export { frontendMobTimer };