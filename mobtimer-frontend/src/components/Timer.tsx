import { TimeUtils } from 'mobtimer-api';
import React, { useEffect, useState } from 'react';
import { Controller } from '../controller';
import { frontendMobTimer } from '../timers';

type FormParameters = {
    timeString: string;
}

const Timer = ({ timeString }: FormParameters) => {

    function onTick() {
        Controller.setTimeString(frontendMobTimer.secondsRemainingString);
        document.title = `${frontendMobTimer.secondsRemainingString} - ${Controller.getAppTitle()}`;
    }

    useEffect(() => {
        // Continuously re-sync the interval to match the frontendMobTimer so that we display whole
        // seconds as accurately as possible.
        const fractionalSeconds = frontendMobTimer.secondsRemaining % 1;
        const secondsBetweenTicks = (fractionalSeconds > 0) ? fractionalSeconds : 1;
        const millisecondsBetweenTicks = TimeUtils.secondsToMilliseconds(secondsBetweenTicks);

        //console.log("--- millisecondsBetweenTicks : " + millisecondsBetweenTicks + " ---");

        //Component mounted
        let interval = setInterval(() => { onTick(); }, millisecondsBetweenTicks);

        //Component will unmount
        return () => { clearInterval(interval) };

    }, [timeString]);

    return (
        <p>{timeString}</p>
    );

}

export default Timer;
export { frontendMobTimer };
