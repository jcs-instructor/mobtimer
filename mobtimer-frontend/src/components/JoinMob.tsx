import React from 'react'

type FormParameters = {
    handleRequest: () => void; 
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