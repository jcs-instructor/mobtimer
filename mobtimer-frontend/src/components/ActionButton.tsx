import React from 'react'

type FormParameters = {
    submitAction: (event: React.FormEvent<HTMLFormElement>) => void;
}

const ActionButton = ({ submitAction: submitAction }: FormParameters) => {

    return (
        <form onSubmit={submitAction}>
            <button type="submit">Start</button>
        </form>
    )
}

export default ActionButton