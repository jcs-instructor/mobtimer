import React from 'react'
import { client } from '../timers';
import { Controller } from '../controller';

type FormParameters = {
    participants: string[];
}

const Participants = ({ participants }: FormParameters) => {
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // todo: something like this: client.update(participants);
    }

    return (
        <form onSubmit={(event) => onSubmit(event)}>
            <label>Participants: </label>
            <label>TO DO: Add participants here</label>
            {/* <input
                value={participants}
                onChange={(e) => Controller.setDurationMinutes(e.target.value as unknown as number)}
                type="text"
                placeholder="Enter a Turn Duration"
            /> 
            <button type="submit">Update</button>
            */}
        </form>
    )
}

export default Participants