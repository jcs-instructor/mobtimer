import React, { useState } from 'react';
import { Controller } from '../controller/controller';

const EditParticipants = () => {

    // const [participantsNames, setParticipantsNames] = useState(Controller._participants.join(","));
    const [participantsNames, setParticipantsNames] = useState("");
    
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        update(participantsNames, setParticipantsNames);
    }

    return (
        <form onSubmit={(event) => onSubmit(event)}>
        {/* <form> */}
            <label>Edit Participants: </label>
            <input
                // value={participants.join(",")}                                
                value={participantsNames}
                //onChange={(e) => Controller.setParticipants((e.target.value as string).split(",").map((name) => name.trim()))}
                //onChange={(e) => Controller.client.editParticipants((e.target.value as string).split(",").map((name) => name.trim()))}                                
                //onChange={(e) => setParticipantsString(e.target.value as string)}
                onFocus={(e) => e.target.value = Controller._participants.join(",")}     
                // onBlur={(e) => update(e.target.value, setParticipantsNames)}                    
                onBlur={(e) => 
                    (e.target.value as string).split(",").map((name) => name.trim()).join(",") !== Controller._participants.join(",")
                    && window.confirm("Update Participants from "
                                     + (Controller._participants.join(","))
                                     + " to "
                                     + (e.target.value as string).split(",").map((name) => name.trim()).join(",")
                                     + "? (Click OK to confirm, or click Cancel to discard changes)")                     
                        ? update(e.target.value, setParticipantsNames) 
                        : setParticipantsNames("")}                    
                onChange={(e) => setParticipantsNames(e.target.value as string)}
                
                type="text"
                placeholder="Enter/Edit Participants"
            />
            {/* <button type="submit">👥 Update</button> */}
        </form>
    )
}

function update(participantsNames: string, setParticipantsNames: React.Dispatch<React.SetStateAction<string>>) {
    Controller.client.editParticipants(participantsNames.split(",").map((name) => name.trim()));
    setParticipantsNames("");
}

export default EditParticipants