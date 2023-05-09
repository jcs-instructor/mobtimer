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
                // todo: replace window.confirm with a modal
                onBlur={(e) => handleBlur(e)}
                onChange={(e) => setParticipantsNames(e.target.value as string)}

                type="text"
                placeholder="Enter/Edit Participants"
            />
            {/* <button type="submit">👥 Update</button> */}
        </form>
    )

    function handleBlur(e: React.FocusEvent<HTMLInputElement, Element>): void {
        const newValue = splitTrimAndRejoin(e.target.value as string);
        const oldValue = Controller._participants.join(",");
        return (newValue) !== oldValue
            && window.confirm("Update Participants from '"
                + oldValue.replaceAll(",", ", ")
                + "' to '"
                + newValue.replaceAll(",", ", ")
                + "'? (Click OK to confirm, or click Cancel to discard changes)")
            ? update(newValue, setParticipantsNames)
            : setParticipantsNames("");
    }

    function update(participantsNames: string, setParticipantsNames: React.Dispatch<React.SetStateAction<string>>) {
        Controller.client.editParticipants(participantsNames.split(",").map((name) => name.trim()));
        setParticipantsNames("");
    }

    function splitAndTrim(string: string) {
        return string.split(",").map(x => x.trim());
    }

    function splitTrimAndRejoin(string: string) {
        return splitAndTrim(string).join(",");
    }
}



export default EditParticipants