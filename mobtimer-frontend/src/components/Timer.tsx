import React, { useEffect, useState } from 'react';
import { Controller } from '../controller';
import { frontendMobTimer } from '../timers';

type FormParameters = {
    timeString: string;
}

const Timer = ({ timeString } : FormParameters) => {

    useEffect(() => {
        //Component mounted
        const interval = setInterval(() => {
            Controller.setTimeString(frontendMobTimer.secondsRemainingString);
            document.title = `${frontendMobTimer.secondsRemainingString} - Mob Timer`;
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