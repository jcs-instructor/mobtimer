import React from 'react';
import { client } from '../timers';

const RotateParticipants = () => {
    
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        client.rotateParticipants();
    }

    return (
        <form onSubmit={(event) => onSubmit(event)}>
            <button type="submit">Rotate</button> {/* 🔁 */}
        </form>
    )
}

export default RotateParticipants