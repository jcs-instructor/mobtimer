import React from 'react';
import { Controller } from 'mobtimer-api';
const controller = Controller.staticController as Controller;

const RotateParticipants = () => {
    
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        controller.client?.rotateParticipants();
    }

    function ableToRotate(): boolean {
        return controller.frontendMobTimer.participants.length > 1;
    }

    return (
        <form onSubmit={(event) => onSubmit(event)}>
            <button type="submit" disabled={!ableToRotate()}>↑ Rotate</button> {/* ⬆️ */}
        </form>
    )
}

export default RotateParticipants