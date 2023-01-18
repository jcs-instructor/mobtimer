import React, { useEffect, useState } from 'react';
import { frontendMobTimer } from '../timers';

type FormParameters = {
    timeString: string;
    setTimeString: (timeString: string) => void;
}

const Timer = ({ timeString, setTimeString } : FormParameters) => {

    useEffect(() => {
        //Component mounted
        const interval = setInterval(() => {
            // console.log(
            //     frontendMobTimer.secondsRemainingString, 
            //     TimeUtils.getMinutesPart(frontendMobTimer.secondsRemaining), 
            //     TimeUtils.getSecondsPart(frontendMobTimer.secondsRemaining),
            //      frontendMobTimer.secondsRemaining);
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