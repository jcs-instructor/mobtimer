import React from 'react';
import { Controller } from 'mobtimer-api';

const Reset = () => {
    
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        Controller.client.reset();
    }

    return (
        <form onSubmit={(event) => onSubmit(event)}>
            <button type="submit">❌ Cancel</button>
        </form>
    )
}

export default Reset