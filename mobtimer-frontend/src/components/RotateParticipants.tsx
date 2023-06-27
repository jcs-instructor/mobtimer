import React from 'react';
import { Controller } from 'mobtimer-api';

const RotateParticipants = () => {
    
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        Controller.client.rotateParticipants();
    }

    function ableToRotate(): boolean {
        return Controller.frontendMobTimer.participants.length > 1;
    }

    return (
        <form onSubmit={(event) => onSubmit(event)}>
            <button type="submit" disabled={!ableToRotate()}>↑ Rotate</button> {/* ⬆️ */}
        </form>
    )
}

export default RotateParticipants