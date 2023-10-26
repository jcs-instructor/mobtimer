import React, { useState } from 'react';
import { Controller } from '../mobtimer-api/src';
const controller = Controller.staticController as Controller;

const EditParticipants = () => {

    // const [participantsNames, setParticipantsNames] = useState(controller.frontendMobTimer.participants.join(","));
    const [participantsNames, setParticipantsNames] = useState("");

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();        
        controller.client?.editParticipants(participantsNames.split(","));
    }

    function areChangesPending(): boolean {
        return true; // todo: validate
    };

    return (
        <form onSubmit={(event) => onSubmit(event)}>            
        <label>Edit Participants: </label>
            <input
                value={participantsNames}
                onFocus={(e) => e.target.value = controller.frontendMobTimer.participants.join(",")}
                // onBlur={(e) => handleBlur(e)}
                onChange={(e) => setParticipantsNames(e.target.value)}
                type="text"
                placeholder="Enter/Edit Participants"
            />
            <button type="submit" disabled={!areChangesPending()}>Save</button>
        </form>
    )

    function confirmUpdate(newValue: string, oldValue: string): void {
        return (newValue) !== oldValue
            && window.confirm("Update Participants from '"
                + oldValue.replaceAll(",", ", ")
                + "' to '"
                + newValue.replaceAll(",", ", ")
                + "'? (Click OK to confirm, or click Cancel to discard changes)")
            ? update(newValue, setParticipantsNames)
            : setParticipantsNames("");
    }

    function handleBlur(e: React.FocusEvent<HTMLInputElement, Element>): void {
        const newValue = splitTrimAndRejoin(e.target.value as string);
        const oldValue = controller.frontendMobTimer.participants.join(",");
        confirmUpdate(newValue, oldValue);
    }

    // function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>): void {
    //     if (e.key === 'Enter') {
    //         handleBlur(e as any);
    //     }
    // }

    function update(participantsNames: string, setParticipantsNames: React.Dispatch<React.SetStateAction<string>>) {
        controller.client?.editParticipants(participantsNames.split(",").map((name) => name.trim()));
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