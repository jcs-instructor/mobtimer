import React, { useState } from 'react'
import { client } from 'websocket';

const Duration = (durationMinutes: number, setDurationMinutes: (durationMinutes: number)=>void) => {
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setDurationMinutes(durationMinutes);
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