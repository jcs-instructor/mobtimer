import React from 'react';

type FormParameters = {
    label: string;
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