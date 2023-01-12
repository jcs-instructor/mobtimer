import React, { useEffect, useState } from 'react';
import { MobTimer, TimeUtils } from 'mobtimer-api';

const frontendMobTimer = new MobTimer('front-end-timer');

const Timer = () => {

    const [timeString, setTimeString] = useState(frontendMobTimer.secondsRemainingString);

    useEffect(() => {
        //Component mounted
        const interval = setInterval(() => {
            setTimeString(frontendMobTimer.secondsRemainingString);
        }, 1000);

        //Component will unmount
        return () => { clearInterval(interval) }

    }, [timeString]);

    return (
        <p>{timeString}</p>
    );

}

export default Timer;
export { frontendMobTimer };