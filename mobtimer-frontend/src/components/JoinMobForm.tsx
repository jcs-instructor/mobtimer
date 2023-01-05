import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


type FormParameters = {
    mobName: string;
    setMobName: (mobName: string) => void;
    submitJoinMobRequest: () => void;
}

const JoinMobForm = () => {
    const [formValue, setFormValue] = useState('')
    const navigate = useNavigate();
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        navigate(`/${formValue}`);
    }

    return (
        <form onSubmit={(event) => onSubmit(event)}>
            <input
                value={formValue}
                onChange={(e) => setFormValue(e.target.value)}
                type="text"
                placeholder="Enter a Mob Name"
            />
            <button type="submit">Submit</button>
        </form>
    )
}

export default JoinMobForm