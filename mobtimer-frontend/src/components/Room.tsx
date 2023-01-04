import React from 'react';
import { useParams } from 'react-router-dom';

type FormParameters = {
    label: string;
    setMobName: (mobName: string) => void;
    submitAction: (event: React.FormEvent<HTMLFormElement>) => void;    
    submitJoinMobRequest: () => void;
}

const Room = ({ label, setMobName, submitAction, submitJoinMobRequest }: FormParameters) => {
    const { mobName } = useParams();    
    console.log('mobName', mobName);
    // todo: execute this when form starts / loads
    // setMobName(mobName || ""); 
    // submitJoinMobRequest(); }

    
    return (
        <>
            <p>{mobName}</p>
            <form onSubmit={
                    (e) => { 
                        submitAction(e);
                        console.log('mobNameONLOAD', mobName); 
                        // todo: remove this after above todo is done (executing these when form starts / loads)
                        setMobName(mobName || ""); 
                        submitJoinMobRequest(); }
                }>
                <button type="submit">{label || "Start (temp hack)"}</button>
            </form>
        </>
    )
}

export default Room