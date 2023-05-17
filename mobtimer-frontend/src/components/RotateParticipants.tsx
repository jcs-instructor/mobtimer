import React from 'react';
import { Controller } from '../controller/controller';

const RotateParticipants = () => {
    
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        Controller.client.rotateParticipants();
    }

    return (
        <form onSubmit={(event) => onSubmit(event)}>
            <button type="submit" disabled={Controller._participants.length < 2}>↑ Rotate</button> {/* ⬆️ */}
        </form>
    )
}

export default RotateParticipants