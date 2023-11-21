import { Controller, TimeUtils } from '../mobtimer-api/src';
import { useEffect } from 'react';
const controller = Controller.staticController as Controller;

type FormParameters = {
    setSecondsRemainingString: (secondsRemainingString: string) => void;
    timeString: string;
}

const Timer = ({ setSecondsRemainingString, timeString }: FormParameters) => {
    
    const frontendMobTimer = controller.frontendMobTimer;
    
    useEffect(() => {
        function onTick() {
            setSecondsRemainingString(frontendMobTimer.secondsRemainingString);
            controller.updateSummary();
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



