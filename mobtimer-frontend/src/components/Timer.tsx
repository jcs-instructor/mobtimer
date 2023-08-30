import { TimeUtils } from 'mobtimer-api';
import { useEffect } from 'react';
import { Controller2 } from 'mobtimer-api';
const controller = Controller2.staticController as Controller2;

type FormParameters = {
    timeString: string;
}

const Timer = ({ timeString }: FormParameters) => {
    
    const frontendMobTimer = controller.frontendMobTimer;
    
    useEffect(() => {
        function onTick() {
            controller.setSecondsRemainingString(frontendMobTimer.secondsRemainingString);
        }
        // Continuously re-sync the interval to match the frontendMobTimer so that we display whole
        // seconds as accurately as possible in the UI. Otherwise, it can be choppy (off by 1 to 999 ms)
        const fractionalSeconds = frontendMobTimer.secondsRemaining % 1;
        const millisecondsUntilNextWholeSecond = TimeUtils.secondsToMilliseconds(fractionalSeconds);
        let millisecondsBetweenTicks =
            (millisecondsUntilNextWholeSecond > 1 && millisecondsUntilNextWholeSecond <= 1000) ?
                millisecondsUntilNextWholeSecond :
                50;

        //console.log("--- millisecondsBetweenTicks : " + millisecondsBetweenTicks + " ---");

        //Component mounted
        let interval = setInterval(() => { onTick(); }, millisecondsBetweenTicks);

        //Component will unmount
        return () => { clearInterval(interval) };

    }, [frontendMobTimer, timeString]);

    return (
        <p className='Time'>{timeString}</p>        
    );

}

export default Timer;



