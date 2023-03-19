import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './JoinMob.css';

const JoinMobForm = () => {
    const [mobNameUrlParam, setMobNameUrlParam] = useState('');
    const navigate = useNavigate();
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        navigate(`/${mobNameUrlParam.toLowerCase()}`);
    }

    return (
        <div><p>top</p>
            <div className="JoinMob">

                <p>
                    abc
                </p>
                <p>def</p>
                <p>ghi</p>
                {/* <form onSubmit={(event) => onSubmit(event)}>
                <label htmlFor="mobName" className="mobLabel">Mob Name</label>
                <input
                    value={mobNameUrlParam}
                    onChange={(e) => setMobNameUrlParam(e.target.value)}
                    type="text"
                    placeholder="Enter a Mob Name"
                    id="mobName"
                />
                <button type="submit">Submit</button>
            </form> */}
                {/* def */}
            </div>
            <p>bottom</p></div>
    )
}

export default JoinMobForm