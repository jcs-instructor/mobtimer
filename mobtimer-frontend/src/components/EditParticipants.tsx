import React from 'react';
import { Controller } from '../controller/controller';

type FormParameters = {
    participants: string[];
}

const EditParticipants = ({ participants }: FormParameters) => {

    // const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();
    //     Controller.client.editParticipants(participants);
    // }

    return (
        // <form onSubmit={(event) => onSubmit(event)}>
        <form>
            <label>Edit Participants: </label>
            <input
                value={participants.join(",")}                
                //onChange={(e) => Controller.setParticipants((e.target.value as string).split(",").map((name) => name.trim()))}
                onChange={(e) => Controller.client.editParticipants((e.target.value as string).split(",").map((name) => name.trim()))}
                type="text"
                placeholder="Enter particpants names"
            />
            {/* <button type="submit">👥 Update</button> */}
        </form>
    )
}

export default EditParticipants