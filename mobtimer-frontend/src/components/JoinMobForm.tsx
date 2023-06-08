import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../App.css';

const JoinMobForm = () => {
    const [mobNameUrlParam, setMobNameUrlParam] = useState('');
    const navigate = useNavigate();
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        navigate(`/${mobNameUrlParam.trim().toLowerCase()}`);
    }

    function isMobNameValid(): boolean {
        return mobNameUrlParam.trim() !== '';
    };

    return (
        <div style={{ display: 'inline-flex' }}>
            <div className="JoinMobForm">

                <form onSubmit={(event) => onSubmit(event)}>
                    <label htmlFor="mobName" className="mobLabel">Mob Name:</label>
                    <input
                        value={mobNameUrlParam}
                        onChange={(e) => setMobNameUrlParam(e.target.value)}
                        type="text"
                        placeholder="Enter a Mob Name"
                        id="mobName"
                    />
                    <button type="submit" disabled={!isMobNameValid()}>START</button>
                </form>
            </div>
        </div>
    )
}

export default JoinMobForm