import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Timer from './Timer';
import Duration from './Duration';
import Participants from './Participants';
import AddParticipant from './AddParticipant';
import RotateParticipants from './RotateParticipants';
import EditParticipants from './EditParticipants';
import Reset from './Reset';

type FormParameters = {
    durationMinutes: number;
    particpants: string[];
    actionButtonLabel: string;
    setMobName: (mobName: string) => void;
    timeString: string;
    submitAction: (event: React.FormEvent<HTMLFormElement>) => void;
    submitJoinMobRequest: () => void;
}

const Room = ({ durationMinutes, particpants, actionButtonLabel, setMobName, timeString, submitAction, submitJoinMobRequest }: FormParameters) => {
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
            <div className="RoomBox">
                <p>TEAM: {mobNameUrlParam}</p>
                <Timer timeString={timeString} />
                <form onSubmit={(e) => submitAction(e)}>
                    <button type="submit">{actionButtonLabel || "Start (temp hack)"}</button>
                </form>
                <Reset />
                <Participants participants={particpants} />
                <EditParticipants participants={particpants} />
                <RotateParticipants />
                <hr />
                <Duration durationMinutes={durationMinutes} />
                <AddParticipant />
            </div>
        </>
    )
}

export default Room