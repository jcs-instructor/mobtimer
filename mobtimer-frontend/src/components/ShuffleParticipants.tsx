import React from 'react';
import { Controller } from 'mobtimer-api';

const ShuffleParticipants = () => {
    
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();        
        // Todo: Provide some movement/animation before shuffle to make sure the user can see movement
        Controller.client.shuffleParticipants();
    }

    function ableToShuffle(): boolean {
        return Controller.frontendMobTimer.participants.length > 1;
    }

    return (
        <form onSubmit={(event) => onSubmit(event)}>
            <button type="submit" disabled={!ableToShuffle()}>⭿ Randomize</button> {/* 🔁 */}
        </form>
    )
}

export default ShuffleParticipants