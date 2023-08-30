import React from 'react'
import { Controller2 } from 'mobtimer-api';
import { TimeUtils } from 'mobtimer-api';
const controller = Controller2.staticController as Controller2;

type FormParameters = {
    durationMinutes: number;
}

const Duration = ({ durationMinutes }: FormParameters) => {
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();        
        controller.client?.update(durationMinutes);
    }

    function isDurationValid(): boolean {
        return durationMinutes >= TimeUtils.secondsToMinutes(1); 
    };

    return (
        <form onSubmit={(event) => onSubmit(event)}>
            <label>Turn Duration (minutes): </label>
            <input
                value={durationMinutes}
                onChange={(e) => controller.setDurationMinutes(e.target.value as unknown as number)}
                type="text"
                placeholder="Enter a Turn Duration"
            />
            <button type="submit" disabled={!isDurationValid()}>⏱️ Update</button>
        </form>
    )
}

export default Duration