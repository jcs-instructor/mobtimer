import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Timer from './Timer';
import Duration from './Duration';


type FormParameters = {
    label: string;
    setMobName: (mobName: string) => void;
    submitAction: (event: React.FormEvent<HTMLFormElement>) => void;
    submitJoinMobRequest: () => void;
}

const Room = ({ label, setMobName, submitAction, submitJoinMobRequest }: FormParameters) => {
    const { mobNameUrlParam } = useParams() as { mobNameUrlParam: string };
    const mobNameLowerCase = mobNameUrlParam.toLowerCase();
    useEffect(
        () => {
            setMobName(mobNameLowerCase);            
            submitJoinMobRequest();
        },
        [mobNameLowerCase, setMobName, submitJoinMobRequest]
    );

    return (
        <>
            <p>{mobNameUrlParam}</p>
            <Timer />         
            <Duration />   
            <form onSubmit={(e) => submitAction(e)}>                
                <button type="submit">{label || "Start (temp hack)"}</button>
            </form>
        </>
    )
}

export default Room