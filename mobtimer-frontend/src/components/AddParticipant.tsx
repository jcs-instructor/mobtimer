import React, { useState } from 'react';
import { Controller } from 'mobtimer-api';

const AddParticipant = () => {
    const [participantName, setParticipantName] = useState('');
    
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const trimmedName = participantName.trim();
        if (trimmedName.length > 0) { // todo also check for duplicates, i.e.,  && !participants.includes(trimmedName))
            Controller.client.addParticipant(trimmedName);
        }            
        setParticipantName('');
    }

    function isParticipantNameValid(): boolean {
        return participantName.trim() !== '';
    };

    return (
        <form onSubmit={(event) => onSubmit(event)}>
            <label>Add Participant: </label>
            <input
                value={participantName}
                onChange={(e) => setParticipantName(e.target.value as string)}
                type="text"
                placeholder="Enter a particpant name"
            />
            <button type="submit" disabled={!isParticipantNameValid()}>➕ Add</button> {/* ➕ */}
        </form>
    )
}

export default AddParticipant