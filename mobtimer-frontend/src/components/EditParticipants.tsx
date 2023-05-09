import React from 'react';
import { Controller } from '../controller/controller';

type FormParameters = {
    participantsString: string;
}

const EditParticipants = ({ participantsString }: FormParameters) => {

    // const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();
    //     Controller.client.editParticipants(participantsString.split(",").map((name) => name.trim()));
    // }

    return (
        // <form onSubmit={(event) => onSubmit(event)}>
        <form>
            <label>Edit Participants: </label>
            <input
                // value={participants.join(",")}                                
                value={participantsString}
                //onChange={(e) => Controller.setParticipants((e.target.value as string).split(",").map((name) => name.trim()))}
                onChange={(e) => Controller.client.editParticipants((e.target.value as string).split(",").map((name) => name.trim()))}                                
                //onChange={(e) => setParticipantsString(e.target.value as string)}
                type="text"
                placeholder="Enter particpants names"
            />
            {/* <button type="submit">👥 Update</button> */}
        </form>
    )
}

export default EditParticipants