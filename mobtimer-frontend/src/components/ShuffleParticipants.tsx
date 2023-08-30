import React from 'react';
import { Controller2 } from 'mobtimer-api';
const controller = Controller2.staticController as Controller2;

const ShuffleParticipants = () => {
    
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();        
        // Todo: Provide some movement/animation before shuffle to make sure the user can see movement
        controller.client?.shuffleParticipants();
    }

    function ableToShuffle(): boolean {
        return controller.frontendMobTimer.participants.length > 1;
    }

    return (
        <form onSubmit={(event) => onSubmit(event)}>
            <button type="submit" disabled={!ableToShuffle()}>⭿ Randomize</button> {/* 🔁 */}
        </form>
    )
}

export default ShuffleParticipants