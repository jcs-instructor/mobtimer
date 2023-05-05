import React from 'react';
import { Controller } from '../controller/controller';

type FormParameters = {
    participants: string[];
}

const EditParticipants = ({ participants }: FormParameters) => {

        const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // TODO: Do a real edit, e.g., pop up a modal dialog with a comma-separated list of participants in an input box, and OK & Cancel buttons
        Controller.client.editParticipants(participants);
        // Controller.client.editParticipants(["AAAAA", ...participants, "ZZZZZ"]); 
    }

    return (
        <form onSubmit={(event) => onSubmit(event)}>
            <button type="submit">Edit...</button>
        </form>
    )
}

export default EditParticipants