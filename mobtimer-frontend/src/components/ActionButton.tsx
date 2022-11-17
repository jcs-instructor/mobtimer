import React, { useState } from 'react';

type FormParameters = {
    label: string;
    //setLabel: (mobName: string) => void;
    submitAction: (event: React.FormEvent<HTMLFormElement>) => void;
}

const ActionButton = ({ label, submitAction }: FormParameters) => {

    return (
        <form onSubmit={submitAction}>
            <button type="submit">{label}</button>
        </form>
    )
}

export default ActionButton