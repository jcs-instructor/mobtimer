import { TimeUtils } from 'mobtimer-api';
import React, { useEffect, useState } from 'react';
import { Controller } from '../controller';
import { frontendMobTimer } from '../timers';

type FormParameters = {
    timeString: string;
}

const Timer = ({ timeString } : FormParameters) => {

    function onTick() {
        Controller.setTimeString(frontendMobTimer.secondsRemainingString);
        document.title = `${frontendMobTimer.secondsRemainingString} - ${Controller.getAppTitle()}`;
    }
 
    useEffect(() => {
        const fractionalSeconds = frontendMobTimer.secondsRemaining % 1;        
        let millisecondsBetweenTicks: number;
        if (fractionalSeconds > 0) {
            millisecondsBetweenTicks = TimeUtils.secondsToMilliseconds(fractionalSeconds);
        } else {
            millisecondsBetweenTicks = 1000;
        }

        console.log("--- millisecondsBetweenTicks: " + millisecondsBetweenTicks + " ---");
        
        //Component mounted
        let interval = setInterval(() => {onTick();}, millisecondsBetweenTicks);

        //Component will unmount
        return () => { clearInterval(interval) };

    }, [timeString]);

    return (
        <p>{timeString}</p>
    );

}

export default Timer;
export { frontendMobTimer };
