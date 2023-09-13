import React from 'react';
import { Controller } from '../mobtimer-api/src';

const controller = Controller.staticController;
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