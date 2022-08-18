import React from 'react'
import { JoinMobEvent } from '../App'

type FormParameters = {
    handleRequest: (event: JoinMobEvent) => void; 
}

const JoinMob = ({ handleRequest }: FormParameters) => {

    return (
        <div onSubmit={handleRequest}>
            <form>
                <input type="text" name="mobname" placeholder="Enter Mob Name" autoComplete="off"/>
                <button>Submit</button>    
            </form>
        </div>
    )
}

export default JoinMob