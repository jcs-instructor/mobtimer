import React from 'react';
import { Controller } from '../controller/controller';

const RotateParticipants = () => {
    
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        Controller.client.rotateParticipants();
    }

    return (
        <form onSubmit={(event) => onSubmit(event)}>
            <button type="submit">Rotate</button> {/* 🔁 */}
        </form>
    )
}

export default RotateParticipants