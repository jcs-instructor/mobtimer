import React from 'react';
import { Controller } from '../controller/controller';

const ShuffleParticipants = () => {
    
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();        
        // Todo: Provide some movement/animation before shuffle to make sure the user can see movement
        Controller.client.shuffleParticipants();
    }

    function ableToShuffle(): boolean {
        return Controller._participants.length > 1;
    }

    return (
        <form onSubmit={(event) => onSubmit(event)}>
            <button type="submit" disabled={!ableToShuffle()}>⭿ Randomize</button> {/* 🔁 */}
        </form>
    )
}

export default ShuffleParticipants