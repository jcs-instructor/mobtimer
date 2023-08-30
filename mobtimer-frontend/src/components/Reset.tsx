import React from 'react';
import { Controller2 } from 'mobtimer-api';

const controller = Controller2.staticController;
const Reset = () => {
    
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        controller.client?.reset();
    }

    return (
        <form onSubmit={(event) => onSubmit(event)}>
            <button type="submit">❌ Cancel</button>
        </form>
    )
}

export default Reset