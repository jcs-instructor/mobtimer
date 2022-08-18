import { type } from '@testing-library/user-event/dist/type';
import React from 'react'

type FormParameters = {
    submitForm: (event: React.FormEvent<HTMLFormElement>) => void;
    setMobName: (mobName: string) => void;
    mobName: string;
}

const JoinMob = ({ submitForm, setMobName, mobName }: FormParameters) => {

    return (
        <form onSubmit={submitForm}>
            <input
                value={mobName}
                onChange={(e) => setMobName(e.target.value)}
                type="text"
                placeholder="Enter a Mob Name"
            />
            <button type="submit">Submit</button>
        </form>
    )
}

export default JoinMob