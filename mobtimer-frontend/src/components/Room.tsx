import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

type FormParameters = {
    label: string;
    mobName: string;
    setMobName: (mobName: string) => void;
    submitAction: (event: React.FormEvent<HTMLFormElement>) => void;
    submitJoinMobRequest: () => void;
}

const Room = ({ label, mobName, setMobName, submitAction, submitJoinMobRequest }: FormParameters) => {
    const { mobNameParam } = useParams();
    const mobNameParamLower = mobNameParam?.toLowerCase() || '';
    console.log('mobNameParam', mobNameParamLower, 'x', mobName)
    useEffect(() => {
        console.log('here we go', mobNameParamLower, 'x', mobName);
        console.log('abut to set mob name', mobNameParamLower, 'x', mobName);
        setMobName(mobNameParamLower);
        console.log('mobNameParam 2', mobNameParamLower, 'x', mobName)
        submitJoinMobRequest();
        console.log('submitted join mob request', mobNameParam, 'x', mobName)
    }, [mobNameParamLower, mobName, setMobName, submitJoinMobRequest]);


    return (
        <>
            <p>{mobName}</p>
            <form onSubmit={
                (e) => {
                    submitAction(e);
                }
            }>
                <button type="submit">{label || "Start (temp hack)"}</button>
            </form>
        </>
    )
}

export default Room