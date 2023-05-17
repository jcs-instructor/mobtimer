import React from 'react'
import { Controller } from '../controller/controller';
import { TimeUtils } from 'mobtimer-api';

type FormParameters = {
    durationMinutes: number;
}

const Duration = ({ durationMinutes }: FormParameters) => {
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();        
        Controller.client.update(durationMinutes);
    }

    function isDurationValid(): boolean {
        return durationMinutes >= TimeUtils.secondsToMinutes(1); 
    };

    return (
        <form onSubmit={(event) => onSubmit(event)}>
            <label>Turn Duration (minutes): </label>
            <input
                value={durationMinutes}
                onChange={(e) => Controller.setDurationMinutes(e.target.value as unknown as number)}
                type="text"
                placeholder="Enter a Turn Duration"
            />
            <button type="submit" disabled={!isDurationValid()}>⏱️ Update</button>
        </form>
    )
}

export default Duration