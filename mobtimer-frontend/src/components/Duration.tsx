import React, { useState } from 'react'
import { client, frontendMobTimer } from '../timers';
import * as Controller from '../controller';

type FormParameters = {
    durationMinutes: number;
}

const Duration = ({ durationMinutes }: FormParameters) => {
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        //frontendMobTimer.durationMinutes = durationMinutes;
        client.update(durationMinutes);
    }

    return (
        <form onSubmit={(event) => onSubmit(event)}>
            <label>Turn Duration (minutes): </label>
            <input
                value={durationMinutes}
                onChange={(e) => Controller.setDurationMinutes2(e.target.value as unknown as number)}
                type="text"
                placeholder="Enter a Turn Duration"
            />
            <button type="submit">Update</button>
        </form>
    )
}

export default Duration