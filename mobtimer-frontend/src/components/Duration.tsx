import React from 'react'
import { Controller } from '../controller/controller';

type FormParameters = {
    durationMinutes: number;
}

const Duration = ({ durationMinutes }: FormParameters) => {
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();        
        Controller.client.update(durationMinutes);
    }

    return (
        <form onSubmit={(event) => onSubmit(event)}>
            <label>Turn Duration (minutes): </label>
            <input
                value={durationMinutes}
                onChange={(e) => Controller.setDurationMinutes(e.target.value as unknown as number)}
                type="text"
                placeholder="Enter a Turn Duration"
            />
            <button type="submit">Update</button>
        </form>
    )
}

export default Duration