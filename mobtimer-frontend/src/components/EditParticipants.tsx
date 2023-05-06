import React, { useState } from 'react';
import { Controller } from '../controller/controller';

type FormParameters = {
    participants: string[];
}

const EditParticipants = ({ participants }: FormParameters) => {
    const [participantsNames, setParticipantsNames] = useState(participants.join(","));

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // TODO: Do a real edit, e.g., pop up a modal dialog with a comma-separated list of participants in an input box, and OK & Cancel buttons
        participants = participantsNames.split(",").map((name) => name.trim());
        Controller.client.editParticipants(participants);
        // Controller.client.editParticipants(["AAAAA", ...participants, "ZZZZZ"]); 
    }

    return (
        <form onSubmit={(event) => onSubmit(event)}>
            <label>Edit Participants: </label>
            <input
                value={participantsNames}
                onChange={(e) => setParticipantsNames(e.target.value as string)}
                type="text"
                placeholder="Enter particpants names"
            />
            <button type="submit">👥 Update</button>
        </form>
    )
}

export default EditParticipants