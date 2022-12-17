import React from 'react';
import { useParams } from 'react-router-dom';

type FormParameters = {
    label: string;
    submitAction: (event: React.FormEvent<HTMLFormElement>) => void;
}

const ActionButton = ({ label, submitAction }: FormParameters) => {
    const { mobName } = useParams();

    return (
        <>
            <p>{mobName}</p>
            <form onSubmit={submitAction}>
                <button type="submit">{label}</button>
            </form>
        </>
    )
}

export default ActionButton