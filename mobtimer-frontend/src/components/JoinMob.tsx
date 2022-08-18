import React from 'react'

type FormParameters = {
    mobName: string;
    setMobName: (mobName: string) => void;
    joinMob: (event: React.FormEvent<HTMLFormElement>) => void;
}

const JoinMob = ({ mobName, setMobName, joinMob }: FormParameters) => {

    return (
        <form onSubmit={joinMob}>
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