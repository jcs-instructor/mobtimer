import React from 'react'
import { useNavigate } from 'react-router-dom';


type FormParameters = {
    mobName: string;
    setMobName: (mobName: string) => void;
    submitJoinMobRequest: () => void;
}

const JoinMobForm = ({ mobName, setMobName, submitJoinMobRequest }: FormParameters) => {
    const navigate = useNavigate();
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        submitJoinMobRequest();
        navigate(`/${mobName}`);
    }

    return (
        <form onSubmit={(event) => onSubmit(event)}>
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