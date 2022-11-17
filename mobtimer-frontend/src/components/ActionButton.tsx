import React from 'react'

type FormParameters = {
    submitAction: (event: React.FormEvent<HTMLFormElement>) => void;
    label: string;
}

const ActionButton = ({ submitAction, label }: FormParameters) => {

    return (
        <form onSubmit={submitAction}>
            <button type="submit">{label}</button>
        </form>
    )
}

export default ActionButton