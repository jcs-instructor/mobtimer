import React, { useEffect, useState } from 'react';
import { MobTimer, TimeUtils } from 'mobtimer-api';

const frontendMobTimer = new MobTimer('front-end-timer');

const Timer = () => {

    const [seconds, setSeconds] = useState(0);

    // const setTheTimer = () => {
    //     const millisecondsRemaining = frontendMobTimer.secondsRemaining * 1000;

    //     console.log('Remaining time', millisecondsRemaining.toLocaleString("en-US") + " ms ("+ Math.round(millisecondsRemaining/1000).toLocaleString("en-US")+" sec.)");

    //     const newSeconds = Math.abs(Math.floor((millisecondsRemaining % (1000 * 60)) / 1000));

    //     return [newSeconds]
    // }

    useEffect(() => {
        //Component mounted
        const interval = setInterval(() => {

            // const [newSeconds] = setTheTimer();
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