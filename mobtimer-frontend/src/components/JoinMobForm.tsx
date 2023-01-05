import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const JoinMobForm = () => {
    const [mobNameUrlParam, setMobNameUrlParam] = useState('');
    const navigate = useNavigate();
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        navigate(`/${mobNameUrlParam.toLowerCase()}`);
    }

    return (
        <form onSubmit={(event) => onSubmit(event)}>
            <input
                value={mobNameUrlParam}
                onChange={(e) => setMobNameUrlParam(e.target.value)}
                type="text"
                placeholder="Enter a Mob Name"
            />
            <button type="submit">Submit</button>
        </form>
    )
}

export default JoinMobForm