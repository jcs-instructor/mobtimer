import React, { useState } from 'react';

import { client, frontendMobTimer } from '../timers';
import { Controller } from '../controller';

type FormParameters = {
    participants: string[];
}

const Participants = ({ participants }: FormParameters) => {
    const [participantName, setParticipantName] = useState('');

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const trimmedName = participantName.trim();
        if (trimmedName !== '') { // todo also check for duplicates, i.e.,  && !participants.includes(trimmedName))
            client.addParticipant(trimmedName);
        }            
        setParticipantName('');
    }

    return (
        <form onSubmit={(event) => onSubmit(event)}>
            <label>Add Participant: </label>
            <input
                value={participantName}
                onChange={(e) => setParticipantName(e.target.value as string)}
                type="text"
                placeholder="Enter a particpant name"
            />
            <button type="submit">Add</button>
            <p />
            <label>Participants: </label>
            <label>{participants.join(",")}</label>
            {/* <ul>
                {participants.map(o => <li key={o}>{o}</li>)}
            </ul>             */}
        </form>
    )
}

export default Participants