import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Timer from './Timer';
import Duration from './Duration';


type FormParameters = {
    durationMinutes: number;
    actionButtonLabel: string;
    setMobName: (mobName: string) => void;
    timeString: string;
    setTimeString: (timeString: string) => void;
    submitAction: (event: React.FormEvent<HTMLFormElement>) => void;
    submitJoinMobRequest: () => void;
}

const Room = ({ durationMinutes, actionButtonLabel, setMobName, timeString, setTimeString, submitAction, submitJoinMobRequest }: FormParameters) => {
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
            <Timer timeString={timeString} setTimeString={setTimeString} />
            <Duration durationMinutes={durationMinutes} />
            <form onSubmit={(e) => submitAction(e)}>
                <button type="submit">{actionButtonLabel || "Start (temp hack)"}</button>
            </form>
        </>
    )
}

export default Room