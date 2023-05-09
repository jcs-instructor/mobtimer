import { TimeUtils } from 'mobtimer-api';
import { useEffect } from 'react';
import { Controller } from '../controller/controller';

type FormParameters = {
    timeString: string;
}

const Timer = ({ timeString }: FormParameters) => {
    
    const frontendMobTimer = Controller.frontendMobTimer;
    
    function onTick() {
        Controller.setSecondsRemainingString(frontendMobTimer.secondsRemainingString);
    }

    useEffect(() => {
        // Continuously re-sync the interval to match the frontendMobTimer so that we display whole
        // seconds as accurately as possible in the UI. Otherwise, it can be choppy (off by 1 to 999 ms)
        const fractionalSeconds = frontendMobTimer.secondsRemaining % 1;
        const millisecondsUntilNextWholeSecond = TimeUtils.secondsToMilliseconds(fractionalSeconds);
        let millisecondsBetweenTicks =
            (millisecondsUntilNextWholeSecond > 1 && millisecondsUntilNextWholeSecond < 1000) ?
                millisecondsUntilNextWholeSecond :
                1000;

        //console.log("--- millisecondsBetweenTicks : " + millisecondsBetweenTicks + " ---");

        //Component mounted
        let interval = setInterval(() => { onTick(); }, millisecondsBetweenTicks);

        //Component will unmount
        return () => { clearInterval(interval) };

    }, [timeString]);

    return (
        <p className='Time'>{timeString}</p>        
    );

}

export default Timer;



