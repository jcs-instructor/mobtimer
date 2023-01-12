import React, { useState } from 'react'
import { frontendMobTimer } from '../timers';

const Duration = () => {
    const [durationMinutes, setDurationMinutes] = useState(frontendMobTimer.durationMinutes);
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        frontendMobTimer.durationMinutes = durationMinutes;
    }

    return (
        <form onSubmit={(event) => onSubmit(event)}>
            <label>Turn Duration (minutes): </label>
            <input
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(e.target.value as unknown as number)}
                type="text"
                placeholder="Enter a Turn Duration"
            />
            <button type="submit">Update</button>
        </form>
    )
}

export default Duration