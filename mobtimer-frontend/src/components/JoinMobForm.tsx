import React from 'react'

type FormParameters = {
    mobName: string;
    setMobName: (mobName: string) => void;
    submitJoinMobRequest: (event: React.FormEvent<HTMLFormElement>) => void;
}

const JoinMobForm = ({ mobName, setMobName, submitJoinMobRequest }: FormParameters) => {

    return (
        <form onSubmit={(event) => submitJoinMobRequest(event)}>
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

export default JoinMobForm