import React from 'react';
import { client } from '../timers';

const Reset = () => {
    
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        client.reset();
    }

    return (
        <form onSubmit={(event) => onSubmit(event)}>
            <button type="submit">❌ Cancel</button>
        </form>
    )
}

export default Reset