import React from 'react'
import { client, frontendMobTimer } from '../timers';
import { Controller } from '../controller';

type FormParameters = {
    participants: string[];
}

const Participants = ({ participants }: FormParameters) => {

    let participantName = "";

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        client.addParticipant(frontendMobTimer.participants.slice(-1)[0]);
    }

    return (
        <form onSubmit={(event) => onSubmit(event)}>
            <label>Add Participant: </label>
            <input
                value={participantName}
                onChange={(e) => Controller.setParticipants(frontendMobTimer.addParticipant(e.target.value as string))}
                type="text"
                placeholder="Enter a particpant name"
            /> 
            <button type="submit">Add</button>
            <label>Participants: </label>
            <label>{participants.join(",")}</label>           
        </form>
    )
}

export default Participants