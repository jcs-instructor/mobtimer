import React from 'react'
import { TimeUtils } from '../mobtimer-api/src';

type FormParameters = {
    durationMinutes: number;
    setDurationMinutes: (durationMinutes: number) => void;
    broadcastDurationMinutes: (durationMinutes: number) => void;
}

const Duration = ({ durationMinutes, setDurationMinutes, broadcastDurationMinutes }: FormParameters) => {
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();                
        broadcastDurationMinutes(durationMinutes);
    }

    function isDurationValid(): boolean {
        return durationMinutes >= TimeUtils.secondsToMinutes(1); 
    };

    return (
        <form onSubmit={(event) => onSubmit(event)}>
            <label>Turn Duration (minutes): </label>
            <input
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(e.target.value as unknown as number)}
                type="text"
                placeholder="Enter a Turn Duration"
            />
            <button type="submit" disabled={!isDurationValid()}>⏱️ Update</button>
        </form>
    )
}

export default Duration